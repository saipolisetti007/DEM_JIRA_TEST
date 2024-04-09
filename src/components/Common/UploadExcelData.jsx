import React, { useRef } from 'react';
import { Button } from '@mui/material';

const UploadExcelData = ({
  color,
  children,
  handleUploadDataExcel,
  isDataLoading,
  isDisable,
  testId
}) => {
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Button
        variant="outlined"
        color={color}
        size="small"
        disabled={isDisable}
        className="w-40"
        onClick={handleClick}>
        {isDataLoading ? 'Uploading...' : children}
      </Button>
      <label style={{ display: 'none' }}>
        Upload File {''}
        <input
          data-testid={testId}
          type="file"
          ref={fileInputRef}
          onChange={handleUploadDataExcel}
          style={{ display: 'none' }}
        />
      </label>
    </>
  );
};

export default UploadExcelData;
