import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DropFileInput from './DropFileInput';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadFileDialog = ({ open, handleClose, handleFileChange, handleSave, fileTypeValid }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const onFileChange = (e) => {
    handleFileChange(e);
    setIsFileUploaded(true);
  };

  const handleDialogClose = () => {
    setIsFileUploaded(false); // Reset file upload state when dialog is closed
    handleClose();
  };

  const handleCancel = () => {
    setIsFileUploaded(false); // Reset file upload state when cancel is clicked
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
            color: '#003DA5',
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
        <DialogContent>
          <DropFileInput onFileChange={onFileChange} reset={!isFileUploaded} />
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            {isFileUploaded && (
              <span>
                {fileTypeValid
                  ? '1/1 files uploaded successfully'
                  : '0/1 files uploaded successfully'}
              </span>
            )}
          </Box>
          {isFileUploaded && (
            <>
              {!fileTypeValid && (
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
                  onClick={handleCancel}>
                  Cancel
                </Button>
              )}
              {fileTypeValid && (
                <Button
                  style={{
                    borderRadius: '2rem',
                    border: '1px solid #3b82f6',
                    fontSize: '12px',
                    fontWeight: '700',
                    backgroundColor: '#003DA5',
                    color: 'white'
                  }}
                  onClick={handleSave}>
                  Save
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UploadFileDialog;
