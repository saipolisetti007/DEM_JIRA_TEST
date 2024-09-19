import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DropFileInput from './DropFileInput';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Transition component for the dialog, using a slide-up animation.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// UploadFileDialog is a functional component that renders a dialog for uploading Excel files.
const UploadFileDialog = ({
  open, // Boolean indicating if the dialog is open.
  handleClose, // Callback function to handle closing the dialog.
  handleUploadDataExcel // Callback function to handle uploading the Excel file.
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [abortController, setAbortController] = useState(null);

  // Cleanup effect to abort the upload if the component unmounts.
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  // Effect to reset the error message when the dialog is closed.
  useEffect(() => {
    if (!open) {
      setErrorMessage('');
    }
  }, [open]);

  // Handle file change event.
  const onFileChange = async (e) => {
    const newFile = e.target.files[0];
    if (newFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setIsLoading(true);
      const controller = new AbortController();
      setAbortController(controller);

      try {
        const event = { target: { files: [newFile] } };
        await handleUploadDataExcel(event, controller.signal);
        handleDialogClose();
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage('Error occurred while uploading the file. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Invalid file format. Please upload an Excel file.');
    }
  };

  // Handle closing the dialog.
  const handleDialogClose = () => {
    setErrorMessage('');
    if (abortController) {
      abortController.abort();
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth>
      <Box sx={{ padding: 1 }}>
        <DialogTitle
          sx={{
            color: isLoading ? 'grey' : '#003DA5',
            fontWeight: 700,
            fontSize: '22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          {'Upload New Data'}
          <IconButton onClick={handleDialogClose} data-testid="close-button">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ position: 'relative' }}>
          <DropFileInput onFileChange={onFileChange} reset={!open} />
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <CircularProgress />
            </Box>
          )}
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            data-testid="cancel-button"
            style={{
              borderRadius: '2rem',
              border: '1px solid #3b82f6',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: '#003DA5',
              color: 'white'
            }}
            onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UploadFileDialog;
