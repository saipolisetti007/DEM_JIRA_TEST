import React, { useRef } from 'react';
import { Button } from '@mui/material';

const UploadExcelData = ({ color, children, handleUploadDataExcel, isDataLoading }) => {
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Button variant="outlined" color={color} size="small" onClick={handleClick}>
        {isDataLoading ? 'Uploading...' : children}
      </Button>
      <label style={{ display: 'none' }}>
        Upload File
        <input
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
