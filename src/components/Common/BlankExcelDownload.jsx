import React from 'react';
import { Button } from '@mui/material';

const BlankExcelDownload = ({ handleDownloadBlankExcel }) => {
  return (
    <Button size="small" variant="contained" color="success" onClick={handleDownloadBlankExcel}>
      Download Blank Template
    </Button>
  );
};

export default BlankExcelDownload;
