import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const InfoSnackBar = ({ isOpen, severity, message, onClose }) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackBar;
