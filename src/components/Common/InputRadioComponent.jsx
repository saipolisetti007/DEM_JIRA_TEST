import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';

const InputRadioComponent = ({ row, column, isRequired, isError, helperText }) => {
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
    setValue(event.target.value);
    setError(false);
  };
  let booleanValue;
  if (value === 'yes') {
    booleanValue = true;
  } else {
    booleanValue = value === 'no' ? false : '';
  }
  row._valuesCache[column.id] = booleanValue;

  return (
    <FormControl error={error}>
      <FormLabel id={`${column.id}-label`} required={isRequired}>
        {column.columnDef.header}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${column.id}-label`}
        name={`${column.id}-radio`}
        value={value}
        onChange={handleChange}>
        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
      </RadioGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputRadioComponent;
