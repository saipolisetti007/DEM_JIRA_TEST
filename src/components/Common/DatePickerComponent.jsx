import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const DatePickerComponent = ({
  row,
  column,
  isRequired,
  isError,
  helperText,
  validationType,
  startDateField
}) => {
  const value = row.original[column.id];
  const initialValue = value ? moment(value, 'MM/DD/YYYY') : null;
  const [error, setError] = useState(isError);
  const [helperMsg, setHelperMsg] = useState(helperText);
  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError]);

  const handleChange = (newValue) => {
    const selectedDate = newValue ? moment(newValue) : null;
    const tomarrow = moment().add(1, 'day');
    const startDate = moment(row._valuesCache[startDateField], 'MM/DD/YYYY');

    if (validationType === 'startDate') {
      if (selectedDate?.isBefore(tomarrow, 'day')) {
        setError(true);
        setHelperMsg('Date Should be a future Date');
        return;
      }
    }

    if (validationType === 'endDate') {
      if (selectedDate?.isSameOrBefore(startDate, 'day')) {
        setError(true);
        setHelperMsg('End Date Should be a greater than start date');
        return;
      }
    }

    const formattdDate = newValue ? selectedDate.format('MM/DD/YYYY') : null;
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
        disablePast
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
