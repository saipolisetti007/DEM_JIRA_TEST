import React from 'react';
import { Button } from '@mui/material';

const ExcelWithDataDownload = () => {
  const handleClick = () => {
    console.log('test');
  };
  return (
    <Button size="small" variant="contained" color="info" onClick={handleClick}>
      Download <br />
      Filled Template
    </Button>
  );
};

export default ExcelWithDataDownload;
