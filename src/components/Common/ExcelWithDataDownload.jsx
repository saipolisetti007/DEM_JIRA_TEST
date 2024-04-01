import React from 'react';
import { Button } from '@mui/material';

const ExcelWithDataDownload = ({ handleDataDownloadExcel }) => {
  return (
    <Button size="small" variant="contained" color="info" onClick={handleDataDownloadExcel}>
      Download Filled Template
    </Button>
  );
};

export default ExcelWithDataDownload;
