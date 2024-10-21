import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme, Theme } from '@mui/material/styles';
import { FormFieldsColumnType, FormFieldsRowType } from '../PromoGrid/PromoGridValidationColumns';

type InputTextComponentPropsType = {
  row: FormFieldsRowType;
  column: FormFieldsColumnType;
  isRequired?: boolean;
  isError: boolean;
  isWarning?: boolean;
  helperText: string;
  validationType: string;
  handleInputChange: Function;
};

// InputTextComponent is a functional component that renders a text input field with validation.
const InputTextComponent = ({
  row, // The row data object containing the original data and index.
  column, // The column definition object containing the column id and header.
  isRequired, // Boolean indicating if the text input is required.
  isError, // Boolean indicating if there is an error state.
  isWarning, // Boolean indicating if there is a warning state.
  helperText, // Text to display as helper message when there is an error or warning.
  validationType, // Type of validation to apply to the input value.
  handleInputChange // Callback function to handle changes in the text input value.
}: InputTextComponentPropsType) => {
  // Access the theme for styling.
  const theme: Theme = useTheme();
  // Initialize state for the input value, error state, and helper message.
  const [rowValue, setRowValue] = useState(row.original[column.id] ?? '');
  const [error, setError] = useState(isError);
  const [helperMsg, setHelperMsg] = useState(helperText);

  // Update the error state and helper message when the isError or helperText props change.
  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError, helperText]);

  // Handle change event for the text input.
  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setRowValue(event.target.value);
    if (!newValue && isRequired) {
      setError(true);
      setHelperMsg('Required');
      return;
    }
    const accessorKey = column.id;
    const rowIndex = row.index;
    // Call the handleInputChange callback and get the error message if any.
    const errorMessage = handleInputChange(newValue, rowIndex, accessorKey, '', validationType);
    // Update the state based on the validation result.
    setError(!!errorMessage);
    setHelperMsg(errorMessage);
  };

  return (
    <TextField
      className="hide-label"
      data-testid={column.id}
      size="small"
      variant="outlined"
      required={isRequired}
      id={`${column.id}-${row.index}`}
      label={column.columnDef.header}
      color={isWarning ? 'warning' : undefined}
      focused={isWarning}
      error={!!error && !isWarning}
      helperText={
        error ? (
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
      value={rowValue}
      onChange={handleTextChange}
    />
  );
};

export default InputTextComponent;
