import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Autocomplete
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@emotion/react';

// FormInputControl component for form fileds on add/ edit forms
const FormInputControl = ({
  control, // Control object from react-hook-form to manage form state
  name, // Name of the form field
  label, // Label for the form field
  type, // Type of the form field (e.g., text, number, select, autocomplete, switch, date)
  options = [], // Options for select and autocomplete fields
  isMultiline, // Boolean to determine if the text field should be multiline
  rows, // Number of rows for multiline text field
  maxLength, // Maximum length of the input value
  isRequired, // Boolean to determine if the field is required
  isDisabled, // Boolean to determine if the field is disabled
  defaultValue, // Default value for the form field
  isChecked, // Boolean to determine if the switch is checked by default
  rules // Validation rules for the form field
}) => {
  // Get clearErrors function from useFormContext
  const { clearErrors } = useFormContext();
  // Function to get validation rules based on props
  const getValidationRules = () => {
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
          message: 'Only integer values are allowed'
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
  // Get theme for styling
  const theme = useTheme();

  // Function to render the appropriate input field based on type (Text, Select, Autocomplete, Switch, Date)
  const renderField = (field, error) => {
    const isWarning = error?.type === 'warning';

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
            color={isWarning ? 'warning' : ''}
            focused={isWarning}
            maxLength={maxLength}
            disabled={isDisabled}
            error={!!error && !isWarning}
            helperText={
              error ? (
                <span
                  style={{
                    color: isWarning ? theme.palette.warning.main : ''
                  }}>
                  {isWarning ? <WarningIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
                  {error.message}
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
            color={isWarning ? 'warning' : ''}
            focused={isWarning}
            error={!!error && !isWarning}
            helperText={
              error ? (
                <span
                  style={{
                    color: isWarning ? theme.palette.warning.main : ''
                  }}>
                  {isWarning ? <WarningIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
                  {error.message}
                </span>
              ) : (
                ''
              )
            }>
            {options.length > 0 ? (
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No Options Available
              </MenuItem>
            )}
          </TextField>
        );
      case 'autocomplete':
        return (
          <Autocomplete
            {...field}
            value={options.includes(field.value) ? field.value : null}
            isOptionEqualToValue={(option, value) => option === value}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="outlined"
                fullWidth
                size="small"
                color={isWarning ? 'warning' : ''}
                focused={isWarning}
                required={isRequired}
                error={!!error && !isWarning}
                helperText={
                  error ? (
                    <span
                      style={{
                        color: isWarning ? theme.palette.warning.main : ''
                      }}>
                      {isWarning ? (
                        <WarningIcon fontSize="small" />
                      ) : (
                        <ErrorIcon fontSize="small" />
                      )}
                      {error.message}
                    </span>
                  ) : (
                    ''
                  )
                }
              />
            )}
            onChange={(event, value) => {
              field.onChange(value);
              clearErrors(name);
            }}
          />
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
                  color: isWarning ? 'warning' : '',
                  focused: isWarning,
                  error: !!error && !isWarning,
                  helperText: error ? (
                    <span
                      style={{
                        color: isWarning ? theme.palette.warning.main : ''
                      }}>
                      {isWarning ? (
                        <WarningIcon fontSize="small" />
                      ) : (
                        <ErrorIcon fontSize="small" />
                      )}
                      {error.message}
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

  // Return the Controller component from react-hook-form with the appropriate props
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? (type === 'date' ? null : type === 'switch' ? isChecked : '')}
      rules={getValidationRules()}
      render={({ field, fieldState: { error } }) => renderField(field, error)}
    />
  );
};

export default FormInputControl;
