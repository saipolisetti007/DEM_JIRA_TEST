import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

type ExcelWithDataDownloadType = {
  handleDataDownloadExcel: () => void;
};
// Common Functional component for  Excel with data Download
// It takes a prop handleDataDownloadExcel which is a function to handle the download action
const ExcelWithDataDownload = ({ handleDataDownloadExcel }: ExcelWithDataDownloadType) => {
  return (
    <Tooltip title="Download file" arrow placement="top">
      <IconButton aria-label="Download file" color="primary" onClick={handleDataDownloadExcel}>
        <DownloadForOfflineIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ExcelWithDataDownload;
