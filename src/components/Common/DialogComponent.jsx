import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogComponent = ({
  open,
  title,
  dialogHeading,
  dialogContent,
  cancelText,
  confirmText,
  handleConfirm,
  handleClose
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle variant="h3" color="primary" sx={{ mb: 3, mt: 1 }}>
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
      <DialogContent sx={{ minWidth: '600px' }}>
        <DialogContentText variant="h5" sx={{ mb: 1 }}>
          {dialogHeading}
        </DialogContentText>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          {cancelText}
        </Button>
        <Button color="primary" variant="contained" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
