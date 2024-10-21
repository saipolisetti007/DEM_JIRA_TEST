import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type ConfirmationDialogPropsType = {
  open: boolean;
  title: string;
  contentHeading: string;
  contentDesp?: string;
  onClose: () => void;
  onConfirm: () => void;
};

//Common component for confirmation dialog
const ConfirmationDialog = ({
  open,
  title,
  contentHeading,
  contentDesp,
  onClose,
  onConfirm
}: ConfirmationDialogPropsType) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-decision"
      aria-describedby="alert-decision-confirmation">
      <DialogTitle variant="h3" color="primary" sx={{ mb: 3, mt: 1 }}>
        {title}
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
        <DialogContentText id="alert-decision-confirmation" variant="h5" sx={{ mb: 1 }}>
          {contentHeading}
        </DialogContentText>
        <DialogContentText>{contentDesp}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button color="primary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onConfirm} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
