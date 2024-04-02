import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const RowActions = ({ row, table }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Delete">
        <IconButton color="error" onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip> */}
    </Box>
  );
};

export default RowActions;
