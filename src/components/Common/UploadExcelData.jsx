import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

// UploadExcelData is a functional component that renders an upload button with a tooltip.
const UploadExcelData = ({
  handleClickOpen, // Callback function to handle the click event for opening the file upload dialog.
  isLoading, // Boolean indicating if the upload is in progress.
  isDisable // Boolean indicating if the upload button should be disabled.
}) => {
  return (
    <Tooltip title="Upload file" arrow placement="top">
      <IconButton
        aria-label="Upload file"
        color="primary"
        onClick={handleClickOpen}
        disabled={isDisable}>
        {isLoading ? (
          <RotateLeftIcon data-testid="RotateLeftIcon" className="animate-spin" />
        ) : (
          <UploadFileIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default UploadExcelData;
