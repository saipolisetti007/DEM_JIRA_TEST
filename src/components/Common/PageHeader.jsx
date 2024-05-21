import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadExcelData from './UploadExcelData';
import ExcelWithDataDownload from './ExcelWithDataDownload';

const PageHeader = ({
  table,
  title,
  subtitle,
  isDataLoading,
  handleDataDownloadExcel,
  handleUploadDataExcel
}) => {
  return (
    <Box className="p-2">
      <div className="flex items-center justify-between gap-8 pb-3">
        <div>
          <Typography variant="h6" as="h2" color="secondary">
            {title}
          </Typography>
          <Typography variant="small">{subtitle}</Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />
          <UploadExcelData
            color="info"
            testId="upload"
            handleUploadDataExcel={handleUploadDataExcel}
            isDataLoading={isDataLoading}>
            Re-Upload / Overwrite Data
          </UploadExcelData>
          <Button
            color="primary"
            onClick={() => {
              table.setCreatingRow(true);
            }}
            variant="contained">
            Add New Record
          </Button>
        </div>
      </div>
      <hr />
    </Box>
  );
};

export default PageHeader;
