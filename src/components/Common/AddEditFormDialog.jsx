import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Common AddEditFormDialog component for Add/Edit form dialog
const AddEditFormDialog = ({
  open, // Boolean to control the open state of the dialog
  title, // Title of the dialog
  cancelText, // Text for the cancel button
  confirmText, // Text for the confirm button
  handleConfirm, // Function to handle confirm action
  handleClose, // Function to handle close action
  children // Content to be displayed inside the dialog
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle variant="h3" color="primary" sx={{ mb: 2, mt: 1 }}>
        {title}
        <IconButton
          aria-label="close"
          size="small"
          color="primary"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '950px' }}>{children}</DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        {cancelText && (
          <Button color="primary" variant="outlined" onClick={handleClose}>
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button color="primary" variant="contained" onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddEditFormDialog;
