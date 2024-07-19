import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const InputTextComponent = ({
  row,
  column,
  isRequired,
  isError,
  helperText,
  validationType,
  handleInputChange
}) => {
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
      data-testid={column.id}
      size="small"
      variant="outlined"
      required={isRequired}
      id={`${column.id}-${row.index}`}
      label={column.columnDef.header}
      error={error}
      helperText={
        error ? (
          <span>
            <ErrorIcon fontSize="small" /> {helperMsg}
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
