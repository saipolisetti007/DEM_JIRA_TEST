import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@emotion/react';

const InputTextComponent = ({
  row,
  column,
  isRequired,
  isError,
  isWarning,
  helperText,
  validationType,
  handleInputChange
}) => {
  const theme = useTheme();
  const [rowValue, setRowValue] = useState(row.original[column.id] ?? '');
  const [error, setError] = useState(isError);
  const [helperMsg, setHelperMsg] = useState(helperText);

  useEffect(() => {
    setError(isError);
    setHelperMsg(helperText);
  }, [isError, helperText]);

  const handleTextChange = (event) => {
    const newValue = event.target.value;
    const accessorKey = column.id;
    const rowIndex = row.index;
    const errorMessage = handleInputChange(newValue, rowIndex, accessorKey, '', validationType);
    setError(!!errorMessage);
    setHelperMsg(errorMessage);
    setRowValue(event.target.value);
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
      color={isWarning ? 'warning' : ''}
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
