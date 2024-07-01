import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadExcelData from './UploadExcelData';
import ExcelWithDataDownload from './ExcelWithDataDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BlankExcelDownload from './BlankExcelDownload';

const PageHeader = ({
  table,
  title,
  subtitle,
  isDataLoading,
  handleDataDownloadExcel,
  handleDownloadBlankExcel,
  handleUploadDataExcel
}) => {
  return (
    <Box className="py-4">
      <div className="flex items-center justify-between gap-8 pb-8">
        <div>
          <Typography component="h1" variant="h5" color="primary">
            {title}
          </Typography>
          <Typography component="h2" variant="body1">
            {subtitle}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <UploadExcelData
            testId="upload"
            handleUploadDataExcel={handleUploadDataExcel}
            isDataLoading={isDataLoading}
          />
          <ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />
          <BlankExcelDownload handleDownloadBlankExcel={handleDownloadBlankExcel} />
          <Button
            variant="outlined"
            color="success"
            size="large"
            className="rounded-full ml-4"
            startIcon={<AddCircleIcon />}
            onClick={() => {
              table.setCreatingRow(true);
            }}>
            Add New Event
          </Button>
        </div>
      </div>
      <hr />
    </Box>
  );
};

export default PageHeader;
