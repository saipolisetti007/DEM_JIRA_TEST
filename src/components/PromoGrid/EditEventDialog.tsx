import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContentText, IconButton } from '@mui/material';
/**
 * EditEventDialog component to confirm editing an event.
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Boolean to control the dialog visibility.
 * @param {Function} props.handleClose - Function to handle closing the dialog.
 * @param {boolean} props.isHistoricalEvent - Boolean to determine if the event is historical.
 * @param {Function} props.onConfirm - Function to handle the confirm action.
 * @param {string} props.eventIds - The IDs of the events to be edited.
 */

type EditEventDialogPropsType = {
  open: boolean;
  handleClose: any;
  isHistoricalEvent: boolean;
  onConfirm: Function;
  eventIds: string[];
};
const EditEventDialog = ({
  open,
  handleClose,
  isHistoricalEvent,
  onConfirm,
  eventIds
}: EditEventDialogPropsType) => {
  //Handle the edit action.
  const handleEdit = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle variant="h3" color="primary" sx={{ mb: 3, mt: 1 }}>
        {isHistoricalEvent ? 'Edit historical event' : 'Edit event'}
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
          You are about to edit the {isHistoricalEvent ? 'historical' : ''} event: &nbsp;
          <strong>{eventIds}</strong>
        </DialogContentText>
        <DialogContentText>Are you sure you want to edit this event?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Return to Manage Events
        </Button>
        <Button color="primary" variant="contained" onClick={handleEdit}>
          Edit Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditEventDialog;
