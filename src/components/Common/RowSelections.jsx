import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CancelIcon from '@mui/icons-material/Cancel';

// RowSelections is a functional component that displays the number of selected rows and provides action buttons.
const RowSelections = ({
  rowCount, // Total number of rows.
  selectedRowCount, // Number of rows that are currently selected.
  handleCancel, // Callback function to handle the cancel action.
  handleSelectedDataDownloadExcel // Callback function to handle exporting selected data to an Excel file.
}) => {
  return (
    <Box className="flex gap-2 items-center justify-end my-2">
      <Typography component="span" variant="body2">
        <strong>{selectedRowCount}</strong> from <strong>{rowCount}</strong> selected:
      </Typography>
      <Tooltip title="Cancel events" arrow placement="top">
        <IconButton color="primary" size="small" onClick={() => handleCancel()}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export files" arrow placement="top">
        <IconButton color="primary" size="small" onClick={handleSelectedDataDownloadExcel}>
          <ImportExportIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowSelections;
