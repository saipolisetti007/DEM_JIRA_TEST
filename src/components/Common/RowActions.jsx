import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

const RowActions = ({ row, table }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowActions;
