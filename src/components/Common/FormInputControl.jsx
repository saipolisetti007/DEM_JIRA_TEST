import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ErrorIcon from '@mui/icons-material/Error';
const FormInputControl = ({
  control,
  name,
  label,
  type,
  options,
  isMultiline,
  rows,
  maxLength,
  isRequired,
  isDisabled,
  defaultValue,
  isChecked,
  rules
}) => {
  const { clearErrors } = useFormContext();
  const getValidtionRules = () => {
    let validationRules = rules;
    if (isRequired) {
      validationRules = {
        ...validationRules,
        required: `${label} is required   `
      };
    }
    if (rules && rules.validationType === 'intValidation') {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[+-]?\d+$/,
          message: 'Only interger values are allowed'
        }
      };
    }
    if (rules && rules.validationType === 'floatValidation') {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[+-]?\d+(\.\d+)?$/,
          message: 'Only float values are allowed'
        }
      };
    }
    return validationRules;
  };

  const renderField = (field, error) => {
    switch (type) {
      case 'text':
      case 'number':
        return (
          <TextField
            {...field}
            type={type}
            label={label}
            data-testid={label}
            variant="outlined"
            fullWidth
            required={isRequired}
            size="small"
            multiline={isMultiline}
            rows={rows}
            maxLength={maxLength}
            disabled={isDisabled}
            error={!!error}
            helperText={
              error ? (
                <span>
                  <ErrorIcon fontSize="small" /> {error.message}
                </span>
              ) : (
                ''
              )
            }
            value={field.value ?? ''}
            onChange={(e) => {
              field.onChange(e.target.value);
              clearErrors(name);
            }}
          />
        );
      case 'select':
        return (
          <TextField
            {...field}
            select
            label={label}
            data-testid={label}
            aria-labelledby={label}
            variant="outlined"
            fullWidth
            required={isRequired}
            size="small"
            error={!!error}
            helperText={
              error ? (
                <span>
                  <ErrorIcon fontSize="small" /> {error.message}
                </span>
              ) : (
                ''
              )
            }>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        );
      case 'switch':
        return (
          <FormControl
            error={!!error}
            component="fieldset"
            sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <FormControlLabel
              sx={{ flexDirection: 'row-reverse' }}
              required={isRequired}
              control={
                <Switch
                  {...field}
                  checked={field.value ?? isChecked}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    clearErrors(name);
                  }}
                />
              }
              label={label}
              data-testid={label}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              {...field}
              label={label}
              value={field.value}
              data-testid={label}
              onChange={(value) => {
                field.onChange(value);
                clearErrors(name);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  clearable: true,
                  variant: 'outlined',
                  fullWidth: true,
                  required: isRequired,
                  error: !!error,
                  helperText: error ? (
                    <span>
                      <ErrorIcon fontSize="small" /> {error.message}
                    </span>
                  ) : (
                    ''
                  )
                }
              }}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (type === 'date' ? null : type === 'switch' ? isChecked : '')}
      rules={getValidtionRules()}
      render={({ field, fieldState: { error } }) => renderField(field, error)}
    />
  );
};

export default FormInputControl;
