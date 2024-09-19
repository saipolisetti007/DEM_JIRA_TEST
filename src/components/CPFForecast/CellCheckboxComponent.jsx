// CellCheckboxComponent is a custom cell component for the checkbox column in the CPFForecast table.
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CellCheckboxComponent = ({
  row, // row object from the table
  rowSelection, // rowSelection object from the table
  handleCheckboxChange, // handleCheckboxChange function from the table
  setRowSelection // setRowSelection function from the table
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Display checkbox only if the row is active */}
    {row.original.active && (
      <>
        <Checkbox
          sx={{ padding: 0 }}
          checked={rowSelection[row.id] || false}
          onChange={(event) => handleCheckboxChange(event, row, setRowSelection)}
        />
        {/* Display warning icon if the forecast is incorrect */}
        {row.original.forecastIncorrect && <WarningAmberIcon color="warning" fontSize="small" />}
        {/* Display error icon if the forecast is missing */}
        {row.original.forecastMissing && <ErrorOutlineIcon color="error" fontSize="small" />}
      </>
    )}
  </div>
);

export default CellCheckboxComponent;
