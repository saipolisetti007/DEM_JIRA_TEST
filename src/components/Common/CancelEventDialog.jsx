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
    <DialogTitle sx={{ marginBottom: 3, marginTop: 1 }} variant="h6" color="primary">
      Cancel Events
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText variant="h7" color="dark">
        You are about to cancel the events:
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
      <Button
        sx={{
          borderRadius: '2rem',
          border: '1px solid #3b82f6',
          fontSize: '12px',
          fontWeight: '700',

          color: '#003DA5'
        }}
        onClick={onClose}
        color="primary">
        Return to Manage Events
      </Button>
      <Button
        sx={{
          borderRadius: '2rem',
          border: '1px solid #3b82f6',
          fontSize: '12px',
          fontWeight: '700',
          backgroundColor: '#003DA5',
          color: 'white'
        }}
        onClick={onConfirm}
        color="secondary">
        Cancel Event
      </Button>
    </DialogActions>
  </Dialog>
);

export default CancelEventDialog;
