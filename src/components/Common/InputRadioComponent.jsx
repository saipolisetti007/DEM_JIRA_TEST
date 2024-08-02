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

const InputRadioComponent = ({
  row,
  column,
  isRequired,
  isError,
  helperText,
  handleInputChange
}) => {
  const rowValue = row.original[column.id];
  let initialValue;
  if (rowValue === true) {
    initialValue = 'yes';
  } else {
    initialValue = rowValue === false ? 'no' : '';
  }
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(isError);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    const accessorKey = column.id;
    const rowIndex = row.index;
    setValue(event.target.value);
    setError(false);
    if (handleInputChange) {
      handleInputChange(newValue, rowIndex, accessorKey, null);
    }
  };
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
