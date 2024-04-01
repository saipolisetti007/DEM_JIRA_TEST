import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import BlankExcelDownload from './BlankExcelDownload';
import UploadExcelData from './UploadExcelData';
import ExcelWithDataDownload from './ExcelWithDataDownload';

const PageHeader = ({
  table,
  title,
  subtitle,
  isDataLoading,
  handleDownloadBlankExcel,
  handleDataDownloadExcel,
  handleUploadDataExcel
}) => {
  return (
    <Box className="p-2">
      <div className="flex items-center justify-between gap-8">
        <div>
          <Typography variant="h6" as="h2" color="secondary">
            {title}
          </Typography>
          <Typography variant="small">{subtitle}</Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
      <div className="flex justify-end py-2 gap-2">
        <BlankExcelDownload handleDownloadBlankExcel={handleDownloadBlankExcel} />
        <UploadExcelData
          testId="upload"
          color="success"
          handleUploadDataExcel={handleUploadDataExcel}
          isDataLoading={isDataLoading}>
          Upload New Data Add to Record
        </UploadExcelData>
        <ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />
        <UploadExcelData color="info" testId="reupload">
          Re-Upload / Overwrite Data
        </UploadExcelData>
      </div>
    </Box>
  );
};

export default PageHeader;
