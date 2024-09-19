import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

// InputRadioComponent is a functional component that renders a radio button group with "Yes" and "No" options.
const InputRadioComponent = ({
  row, // The row data object containing the original data and index.
  column, // The column definition object containing the column id and header.
  isRequired, // Boolean indicating if the radio input is required.
  isError, // Boolean indicating if there is an error state.
  helperText, // Text to display as helper message when there is an error.
  handleInputChange // Callback function to handle changes in the radio input value.
}) => {
  // Extract the initial value from the row data based on the column id.
  const rowValue = row.original[column.id];
  let initialValue;
  if (rowValue === true) {
    initialValue = 'yes';
  } else {
    initialValue = rowValue === false ? 'no' : '';
  }
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(isError);

  // Update the error state when the isError prop changes.
  useEffect(() => {
    setError(isError);
  }, [isError]);

  // Handle change event for the radio buttons.
  const handleChange = (event) => {
    const newValue = event.target.value;
    const accessorKey = column.id;
    const rowIndex = row.index;
    setValue(event.target.value);
    setError(false);
    // Call the handleInputChange callback if provided.
    if (handleInputChange) {
      handleInputChange(newValue, rowIndex, accessorKey, null);
    }
  };

  // Convert the radio button value to a boolean value for caching.
  let booleanValue;
  if (value === 'yes') {
    booleanValue = true;
  } else {
    booleanValue = value === 'no' ? false : '';
  }
  row._valuesCache[column.id] = booleanValue;

  return (
    <FormControl className="hide-label" error={error}>
      <FormLabel id={`${column.id}-label`} required={isRequired}>
        {column.columnDef.header}
      </FormLabel>
      <RadioGroup
        data-testid={`${column.id}_radio`}
        row
        aria-labelledby={`${column.id}-label`}
        name={`${column.id}-radio`}
        value={value}
        onChange={handleChange}>
        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
      </RadioGroup>
      {error && (
        <FormHelperText>
          <ErrorIcon fontSize="small" /> {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputRadioComponent;
