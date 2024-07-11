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

const CancelEventDialog = ({ open, onClose, onConfirm, eventIds }) => (
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
        You are about to cancel the events: &nbsp;
        {eventIds.slice(0, 3).map((id, index) => (
          <span key={id}>
            {id}
            {index < eventIds.slice(0, 3).length - 1 && ', '}
          </span>
        ))}
        {eventIds.length > 3 && '...'}
      </DialogContentText>
      <DialogContentText variant="body1">
        Are you sure you want to cancel these events?
        <br />
        The items will be canceled immediately. You can’t undo this action.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ marginBottom: 1 }}>
      <Button variant="outlined" onClick={onClose} color="primary">
        Return to Manage Events
      </Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        Cancel Event
      </Button>
    </DialogActions>
  </Dialog>
);

export default CancelEventDialog;
