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

// DialogComponent is a functional component that renders a customizable dialog.
const DialogComponent = ({
  open, // Boolean indicating if the dialog is open.
  title, // The title of the dialog.
  dialogHeading, // The heading text of the dialog content.
  dialogContent, // The main content text of the dialog.
  cancelText, // The text for the cancel button.
  confirmText, // The text for the confirm button.
  handleConfirm, // Callback function to handle confirm action.
  handleClose // Callback function to handle close action.
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
        <DialogContentText
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: dialogContent }}
        />
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
