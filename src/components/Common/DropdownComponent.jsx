import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@emotion/react';

const DropdownComponent = ({
  row,
  column,
  label,
  options,
  isError,
  isWarning,
  helperText,
  isEventSelected,
  onChange,
  clearEventErrors,
  handleInputChange,
  selectedState
}) => {
  const theme = useTheme();
  const rowValue = row.original[column.id] || '';
  const [isInitValue, setIsInitValue] = useState(true);
  const [value, setValue] = useState(rowValue);
  const [error, setError] = useState(isError);
  const accessorKey = column.id;
  const rowIndex = row.index;
  const [helperMsg, setHelperMsg] = useState(helperText);

  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
    if (isInitValue) {
      setValue(rowValue);
      if (rowValue && onChange) {
        onChange(rowValue);
      }
      setIsInitValue(false);
    }
  }, [isError, helperText, isInitValue]);

  useEffect(() => {
    if (!isInitValue && selectedState === '') {
      setValue('');
    }
  }, [selectedState]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
    if (clearEventErrors) {
      clearEventErrors(newValue, accessorKey);
    }
    if (handleInputChange) {
      handleInputChange(newValue, rowIndex, accessorKey, null);
    }

    setError(false);
    setHelperMsg(null);
  };

  row._valuesCache[column.id] = value;

  return (
    <div>
      <FormControl className="hide-label" fullWidth size="small" error={error}>
        <InputLabel id={`${column.id}-${row.index}`}>{label}</InputLabel>
        <Select
          labelId={`${column.id}-${row.index}`}
          id={`${column.id}_${row.index}`}
          value={options?.includes(value) ? value : ''}
          label={label}
          color={isWarning ? 'warning' : ''}
          data-testid={column.id}
          onChange={handleChange}>
          {!isEventSelected && (
            <MenuItem disabled value="">
              Please select event type first
            </MenuItem>
          )}
          {options?.length === 0 && isEventSelected ? (
            <MenuItem disabled value="">
              No Options Available
            </MenuItem>
          ) : (
            options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          )}
        </Select>
        {error && (
          <FormHelperText>
            <span
              style={{
                color: isWarning ? theme.palette.warning.main : ''
              }}>
              {isWarning ? <WarningIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
              {helperMsg}
            </span>
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default DropdownComponent;
