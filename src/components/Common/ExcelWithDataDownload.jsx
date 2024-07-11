import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const ExcelWithDataDownload = ({ handleDataDownloadExcel }) => {
  return (
    <Tooltip title="Download file" arrow placement="top">
      <IconButton aria-label="Download file" color="primary" onClick={handleDataDownloadExcel}>
        <DownloadForOfflineIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ExcelWithDataDownload;
