import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const ExcelWithDataDownload = ({ handleDataDownloadExcel }) => {
  return (
    <Tooltip title="Downolad files" arrow placement="top">
      <IconButton aria-label="Downolad files" color="primary" onClick={handleDataDownloadExcel}>
        <DownloadForOfflineIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ExcelWithDataDownload;
