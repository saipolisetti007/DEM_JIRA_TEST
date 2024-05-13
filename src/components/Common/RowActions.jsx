import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const RowActions = ({ row, table, handleCancel }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
      <Tooltip title="Edit">
        <IconButton color="success" onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancel">
        <IconButton color="error" onClick={() => handleCancel(row)}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowActions;
