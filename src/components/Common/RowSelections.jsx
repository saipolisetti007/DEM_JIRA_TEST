import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CancelIcon from '@mui/icons-material/Cancel';

const RowSelections = ({ rowCount, selectedRowCount }) => {
  return (
    <Box className="flex gap-2 items-center justify-end my-2">
      <Typography component="span" variant="body2">
        <strong>{selectedRowCount}</strong> from <strong>{rowCount}</strong> selected :
      </Typography>
      <Tooltip title="Cancel events" arrow placement="top">
        <IconButton color="primary" size="small">
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export files" arrow placement="top">
        <IconButton color="primary" size="small">
          <ImportExportIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowSelections;
