import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ValidationPageDialog is a functional component that renders a confirmation dialog for leaving the page.
const ValidationPageDialog = ({
  open, // Boolean indicating if the dialog is open.
  onClose, // Callback function to handle closing the dialog.
  onConfirm, // Callback function to handle confirming the action to leave the page.
  onReturnToPromoGrid, // Callback function to handle returning to the Promo Grid Validation page.
  isCanceling // Boolean indicating if the cancel action is in progress.
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ mb: 3, mt: 1 }} variant="h3" color="primary">
        Do you want to leave this page?
        <IconButton
          aria-label="close"
          size="small"
          color="primary"
          onClick={onClose}
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
          You are about to leave the Promo Grid Validation page
        </DialogContentText>
        <DialogContentText variant="body1">
          Are you sure you want to leave this page?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ marginBottom: 1 }}>
        <Button
          variant="outlined"
          onClick={onReturnToPromoGrid}
          color="primary"
          disabled={isCanceling}>
          Return to Promo Grid Validation
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Leave this page
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationPageDialog;
