import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const RowActions = ({ row, hoveredRow, handleEdit, handleCancel }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}
      className="action-buttons">
      {hoveredRow === row.id && (
        <>
          <Tooltip title="Edit Event" arrow placement="top">
            <IconButton color="primary" size="small" onClick={() => handleEdit(row)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel Event" arrow placement="top">
            <IconButton color="primary" size="small" onClick={() => handleCancel(row)}>
              <CancelIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default RowActions;
