// CellComponent.jsx
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CellCheckboxComponent = ({ row, rowSelection, handleCheckboxChange, setRowSelection }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {row.original.active && (
      <>
        <Checkbox
          sx={{ padding: 0 }}
          checked={rowSelection[row.id] || false}
          onChange={(event) => handleCheckboxChange(event, row, setRowSelection)}
        />
        {row.original.forecastIncorrect && <WarningAmberIcon color="warning" fontSize="small" />}
        {row.original.forecastMissing && <ErrorOutlineIcon color="error" fontSize="small" />}
      </>
    )}
  </div>
);

export default CellCheckboxComponent;
