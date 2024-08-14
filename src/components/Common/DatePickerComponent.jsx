import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@emotion/react';

const DatePickerComponent = ({
  row,
  column,
  isRequired,
  isError,
  isWarning,
  helperText,
  validationType,
  startDateField,
  handleInputChange
}) => {
  const theme = useTheme();
  const value = row.original[column.id];
  const initialValue = value ? moment(value, 'MM/DD/YYYY') : null;
  const [error, setError] = useState(isError);
  const [helperMsg, setHelperMsg] = useState(helperText);

  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError, helperText]);

  const handleChange = (newValue) => {
    const selectedDate = newValue ? moment(newValue) : null;
    const accessorKey = column.id;
    const rowIndex = row.index;
    const startDate = moment(row._valuesCache[startDateField], 'MM/DD/YYYY');
    const formatedDate = newValue ? selectedDate.format('MM/DD/YYYY') : null;
    row._valuesCache[column.id] = formatedDate;

    if (validationType === 'startDate') {
      if (!selectedDate && isRequired) {
        setError(true);
        setHelperMsg('Required');
        return;
      }
    }

    if (validationType === 'endDate') {
      if (selectedDate?.isBefore(startDate, 'day')) {
        setError(true);
        setHelperMsg('End Date should be equal/after start date');
        return;
      } else if (!selectedDate && isRequired) {
        setError(true);
        setHelperMsg('Required');
        return;
      }
    }
    setError(false);
    setHelperMsg(null);
    if (handleInputChange) {
      handleInputChange(formatedDate, rowIndex, accessorKey, null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        onChange={handleChange}
        className="hide-label"
        aria-labelledby={`${column.id}-label`}
        label={column.columnDef.header}
        value={initialValue}
        slotProps={{
          textField: {
            size: 'small',
            clearable: true,
            required: isRequired,
            color: isWarning ? 'warning' : '',
            focused: isWarning,
            error: error && !isWarning,
            helperText: error ? (
              <span
                style={{
                  color: isWarning ? theme.palette.warning.main : ''
                }}>
                {isWarning ? <WarningIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
                {helperMsg}
              </span>
            ) : (
              ''
            )
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
