import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';

type InfoSnackBarPropsType = {
  isOpen: boolean;
  severity: string;
  message: string | React.ReactNode;
  onClose: () => void;
  dataTestId?: string;
};

// InfoSnackBar component for displaying success, error  messages
const InfoSnackBar = ({
  isOpen,
  severity,
  message,
  onClose,
  dataTestId
}: InfoSnackBarPropsType) => {
  return (
    <Snackbar
      open={isOpen} // Boolean to control whether the Snackbar is open
      onClose={onClose} // Function to handle the close event
      autoHideDuration={5000} // Duration in milliseconds before the Snackbar automatically hides
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position of the Snackbar on the screen
      data-testid="snackbar" // Test ID for the Snackbar component
    >
      <Alert
        onClose={onClose} // Function to handle the close event for the Alert
        severity={severity as AlertColor} // Severity level of the Alert (e.g., error, warning, info, success)
        data-testid={dataTestId} // Test ID for the Alert component
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackBar;
