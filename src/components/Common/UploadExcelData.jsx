import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const UploadExcelData = ({ handleClickOpen, isLoading, isDisable }) => {
  return (
    <>
      <Tooltip title="Import files" arrow placement="top">
        <IconButton
          aria-label="Import files"
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
    </>
  );
};

export default UploadExcelData;
