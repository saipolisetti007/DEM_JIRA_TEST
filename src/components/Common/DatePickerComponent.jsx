import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React from 'react';

const DatePickerComponent = ({ row, column }) => {
  const value = row.original[column.id];
  const initialValue = value ? moment(value, 'MM/DD/YYYY') : null;
  const handleChange = (newValue) => {
    row._valuesCache[column.id] = moment(newValue).format('MM/DD/YYYY');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        onChange={handleChange}
        aria-labelledby={`${column.id}-label`}
        label={column.columnDef.header}
        value={initialValue}
        slotProps={{ textField: { size: 'small', required: true } }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
