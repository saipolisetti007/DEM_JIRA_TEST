import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { useFileUpload } from '../../hooks/useFileUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const UploadExcelData = ({ handleUploadDataExcel, isDataLoading, isDisable, testId }) => {
  const { isLoading, fileInputRef, handleClick, handleFileUpload } = useFileUpload({
    isDataLoading,
    handleUploadDataExcel
  });

  return (
    <>
      <Tooltip title="Import files" arrow placement="top">
        <IconButton
          aria-label="Import files"
          color="primary"
          onClick={handleClick}
          disabled={isDisable}>
          {isLoading ? <RotateLeftIcon className="animate-spin" /> : <UploadFileIcon />}
        </IconButton>
      </Tooltip>
      <label style={{ display: 'none' }}>
        Upload File {''}
        <input
          data-testid={testId}
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </label>
    </>
  );
};

export default UploadExcelData;
