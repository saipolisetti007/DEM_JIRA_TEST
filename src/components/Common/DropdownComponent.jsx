import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@emotion/react';

// DropdownComponent is a functional component that renders a dropdown (select) input with validation and error handling.
const DropdownComponent = ({
  row, // The row data containing the value for the dropdown.
  column, // The column definition containing the column id.
  label, // The label for the dropdown.
  options, // The options for the dropdown.
  isError, // Boolean indicating if there is an error.
  isWarning, // Boolean indicating if there is a warning.
  helperText, // The helper text to display when there is an error or warning.
  isEventSelected, // Boolean indicating if an event is selected.
  onChange, // Callback function to handle change events.
  clearEventErrors, // Callback function to clear event errors.
  handleInputChange, // Callback function to handle input changes.
  selectedState // The selected state of the dropdown.
}) => {
  const theme = useTheme();
  const rowValue = row.original[column.id] || '';
  const [isInitValue, setIsInitValue] = useState(true);
  const [value, setValue] = useState(rowValue);
  const [error, setError] = useState(isError);
  const accessorKey = column.id;
  const rowIndex = row.index;
  const [helperMsg, setHelperMsg] = useState(helperText);

  // useEffect to update error and helper text when isError or helperText props change.
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

  // useEffect to reset value when selectedState changes.
  useEffect(() => {
    if (!isInitValue && selectedState === '') {
      setValue('');
    }
  }, [selectedState]);

  // Handle change event for the dropdown.
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
    // Clear error and helper text if validation passes.
    setError(false);
    setHelperMsg(null);
  };

  // Update the row data with the current value.
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
          {/* Conditional rendering for options */}
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
        {/* FormHelperText for displaying error or warning messages */}
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
