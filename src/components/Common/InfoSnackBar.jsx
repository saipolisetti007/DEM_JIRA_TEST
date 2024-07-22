import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const InfoSnackBar = ({ isOpen, severity, message, onClose, dataTestId }) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      data-testid="snackbar">
      <Alert onClose={onClose} severity={severity} data-testid={dataTestId}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackBar;
