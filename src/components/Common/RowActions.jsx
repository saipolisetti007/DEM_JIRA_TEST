import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

// RowActions is a functional component that renders action buttons for a table row.
const RowActions = ({
  row, // The current row data object.
  hoveredRow, // The id of the row that is currently hovered.
  handleEdit, // Callback function to handle the edit action.
  editTooltip = 'Edit Event', // Tooltip text for the edit button.
  cancelTooltip = 'Cancel Event', // Tooltip text for the cancel button.
  handleCancel, // Callback function to handle the cancel action.
  isEdit
}) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}
      className="action-buttons">
      {hoveredRow === row.id && (
        <>
          {isEdit ? (
            <Tooltip title={editTooltip} arrow placement="top">
              <IconButton color="primary" size="small" onClick={() => handleEdit(row)}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title={cancelTooltip} arrow placement="top">
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
