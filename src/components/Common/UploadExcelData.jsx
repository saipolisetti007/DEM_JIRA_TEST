import React, { useRef } from 'react';
import { Button } from '@mui/material';

const UploadExcelData = ({ color, children }) => {
  const fileInputRef = useRef(null);
  // const handleFileChange = (e) => {
  //   const uploadedFile = e.target.files[0];
  //   onFileUpload(uploadedFile);
  // };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Button variant="outlined" color={color} size="small" onClick={handleClick}>
        {children}
      </Button>
      <label style={{ display: 'none' }}>
        Upload File
        <input
          type="file"
          ref={fileInputRef}
          // onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </>
  );
};

export default UploadExcelData;
