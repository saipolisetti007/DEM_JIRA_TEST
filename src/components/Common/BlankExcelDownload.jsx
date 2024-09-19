import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

// Common Functional component for  BlankExcelDownload template
// It takes a prop handleDownloadBlankExcel which is a function to handle the download action
const BlankExcelDownload = ({ handleDownloadBlankExcel }) => {
  return (
    <Tooltip title="Download blank template" arrow placement="top">
      <IconButton
        aria-label="Download blank template"
        color="primary"
        onClick={handleDownloadBlankExcel}>
        <SimCardDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BlankExcelDownload;
