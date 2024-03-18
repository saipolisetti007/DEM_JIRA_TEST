import React from 'react';
import { Button } from '@mui/material';

const BlankExcelDownload = () => {
  const handleClick = () => {
    console.log('test');
  };
  return (
    <Button size="small" variant="contained" color="success" onClick={handleClick}>
      Download <br />
      Blank Template
    </Button>
  );
};

export default BlankExcelDownload;
