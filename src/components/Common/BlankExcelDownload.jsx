import React from 'react';
import { Button } from '@mui/material';

const BlankExcelDownload = ({ handleDownloadBlankExcel }) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="success"
      className="w-40"
      onClick={handleDownloadBlankExcel}>
      Download Blank Template
    </Button>
  );
};

export default BlankExcelDownload;
