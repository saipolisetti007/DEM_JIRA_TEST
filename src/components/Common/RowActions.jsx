import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const RowActions = ({ row, table, handleCancel }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
      <Tooltip title="Edit" arrow placement="top">
        <IconButton color="success" size="small" onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancel" arrow placement="top">
        <IconButton color="error" size="small" onClick={() => handleCancel(row)}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowActions;
