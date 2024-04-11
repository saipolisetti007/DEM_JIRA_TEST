import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const DatePickerComponent = ({ row, column, isRequired, isError, helperText }) => {
  const value = row.original[column.id];
  const initialValue = value ? moment(value, 'MM/DD/YYYY') : null;
  const [error, setError] = useState(isError);
  const [helperMsg, setHelperMsg] = useState(helperText);
  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError]);
  const handleChange = (newValue) => {
    const formattdDate = newValue ? moment(newValue).format('MM/DD/YYYY') : null;
    row._valuesCache[column.id] = formattdDate;
    setError(false);
    setHelperMsg('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        onChange={handleChange}
        aria-labelledby={`${column.id}-label`}
        label={column.columnDef.header}
        value={initialValue}
        slotProps={{
          textField: {
            size: 'small',
            clearable: true,
            required: isRequired,
            error: error,
            helperText: helperMsg
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
