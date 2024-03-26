import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const InputRadioComponent = ({ row, column }) => {
  const rowValue = row.original[column.id];
  const initialValue = rowValue === true ? 'yes' : rowValue === false ? 'no' : '';
  const [value, setValue] = useState(initialValue);
  return (
    <FormControl>
      <FormLabel id={`${column.id}-label`}>{column.columnDef.header}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${column.id}-label`}
        name={`${column.id}-radio`}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}>
        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};

export default InputRadioComponent;
