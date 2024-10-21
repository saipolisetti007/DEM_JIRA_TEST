import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme, Theme } from '@mui/material/styles';
import { FormFieldsColumnType, FormFieldsRowType } from '../PromoGrid/PromoGridValidationColumns';

type DatePickerComponentPropsType = {
  row: FormFieldsRowType;
  column: FormFieldsColumnType;
  isRequired: boolean;
  isError: boolean;
  isWarning?: boolean;
  helperText: string;
  validationType?: 'startDate' | 'endDate';
  startDateField?: string;
  handleInputChange: Function;
};
// DatePickerComponent functional component that renders a date picker with validation and error handling.
const DatePickerComponent = ({
  row, // The row data containing the date value.
  column, // The column definition containing the column id and header.
  isRequired, // Boolean indicating if the date field is required.
  isError, // Boolean indicating if there is an error.
  isWarning, // Boolean indicating if there is a warning.
  helperText, // The helper text to display when there is an error or warning.
  validationType, // The type of validation to perform ('startDate' or 'endDate').
  startDateField, // The field name of the start date for validation.
  handleInputChange // Callback function to handle input changes.
}: DatePickerComponentPropsType) => {
  const theme = useTheme() as Theme; // Get the current theme for styling.
  const value = row.original[column.id]; // Get the initial value from the row data.
  const initialValue = value ? moment(value, 'MM/DD/YYYY') : null; // Parse the initial value using moment.
  const [error, setError] = useState<boolean>(isError);
  const [helperMsg, setHelperMsg] = useState<string | null>(helperText);

  // useEffect to update error and helper text when isError or helperText props change
  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError, helperText]);

  // Handle date change event.
  const handleChange = (newValue) => {
    const selectedDate = newValue ? moment(newValue) : null;
    const accessorKey = column.id;
    const rowIndex = row.index;
    const startDate = moment(
      startDateField ? row._valuesCache[startDateField] : undefined,
      'MM/DD/YYYY'
    );
    const formattedDate = selectedDate ? selectedDate.format('MM/DD/YYYY') : null;
    row._valuesCache[column.id] = formattedDate;

    // Validation for start date.
    if (validationType === 'startDate' && !selectedDate && isRequired) {
      setError(true);
      setHelperMsg('Required');
      return;
    }

    // Validation for end date.
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

    // Clear error and helper text if validation passes.
    setError(false);
    setHelperMsg(null);

    // Call handleInputChange callback function if provided.
    if (handleInputChange) {
      handleInputChange(formattedDate, rowIndex, accessorKey, null);
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
            // @ts-ignore
            clearable: true,
            required: isRequired,
            color: isWarning ? 'warning' : undefined,
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
