import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type CancelEventDialogType = {
  open: boolean;
  onClose: any;
  onConfirm: any;
  eventCount: number;
  isCanceling: boolean;
};
// CancelEventDialog component for Cancel Events
const CancelEventDialog = ({
  open, // Boolean to control whether the dialog is open or closed
  onClose, // Function to handle closing the dialog
  onConfirm, // Function to handle confirming the cancellation
  eventCount, // Number of events to be canceled
  isCanceling // Boolean to indicate if the cancellation process is ongoing
}: CancelEventDialogType) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{ mb: 3, mt: 1 }} variant="h3" color="primary">
      Cancel Events
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
        You are about to cancel {eventCount} event{eventCount > 1 ? 's' : ''}.
      </DialogContentText>
      <DialogContentText variant="body1">
        Are you sure you want to cancel these events?
        <br />
        The items will be canceled immediately. You can’t undo this action.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ marginBottom: 1 }}>
      <Button variant="outlined" onClick={onClose} color="primary" disabled={isCanceling}>
        Return to Manage Events
      </Button>
      <Button onClick={onConfirm} variant="contained" color="primary" disabled={isCanceling}>
        {isCanceling ? <CircularProgress size={24} /> : 'Cancel Event'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CancelEventDialog;
