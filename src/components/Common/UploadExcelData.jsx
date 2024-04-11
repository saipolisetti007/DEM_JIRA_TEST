import React from 'react';
import { Button } from '@mui/material';
import { useFileUpload } from '../../hooks/useFileUpload';

const UploadExcelData = ({
  color,
  children,
  handleUploadDataExcel,
  isDataLoading,
  isDisable,
  testId
}) => {
  const { isLoading, fileInputRef, handleClick, handleFileUpload } = useFileUpload({
    isDataLoading,
    handleUploadDataExcel
  });

  return (
    <>
      <Button
        variant="outlined"
        color={color}
        size="small"
        disabled={isDisable}
        className="w-40"
        onClick={handleClick}>
        {isLoading ? 'Uploading...' : children}
      </Button>
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
