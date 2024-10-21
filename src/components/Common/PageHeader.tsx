import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadExcelData from './UploadExcelData';
import ExcelWithDataDownload from './ExcelWithDataDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BlankExcelDownload from './BlankExcelDownload';
import UploadFileDialog from './UploadFileDialog';

type PageHeaderPropsType = {
  title: string;
  subtitle: string;
  isDataLoading: boolean;
  handleAddEventOpen: any;
  handleDataDownloadExcel: any;
  handleDownloadBlankExcel: any;
  handleUploadDataExcel: any;
};
// PageHeader is a functional component that renders the header section of a page with title, subtitle, and action buttons.
const PageHeader = ({
  title, // The main title to display in the header.
  subtitle, // The subtitle to display under the main title.
  isDataLoading, // Boolean indicating if data is currently loading.
  handleAddEventOpen, // Callback function to handle the "Add New Event" button click.
  handleDataDownloadExcel, // Callback function to handle downloading data as an Excel file.
  handleDownloadBlankExcel, // Callback function to handle downloading a blank Excel template.
  handleUploadDataExcel // Callback function to handle uploading data from an Excel file.
}: PageHeaderPropsType) => {
  const [open, setOpen] = useState(false);
  // Function to open the upload file dialog.
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to close the upload file dialog.
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="py-2">
      <div className="flex items-start justify-between gap-8">
        <div>
          <Typography component="h1" variant="h2" color="primary">
            {title}
          </Typography>
          <Typography component="h2" variant="body1">
            {subtitle}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          {/* Component to handle uploading Excel data */}
          <UploadExcelData handleClickOpen={handleClickOpen} isLoading={isDataLoading} />
          {/* Component to handle downloading data as an Excel file */}
          <ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />
          {/* Component to handle downloading a blank Excel template */}
          <BlankExcelDownload handleDownloadBlankExcel={handleDownloadBlankExcel} />
          {/* Button to open the "Add New Event" dialog */}
          <Button
            variant="outlined"
            color="success"
            size="large"
            className="rounded-full ml-4"
            startIcon={<AddCircleIcon />}
            onClick={handleAddEventOpen}>
            Add New Event
          </Button>
        </div>
        <UploadFileDialog
          open={open}
          handleClose={handleClose}
          handleUploadDataExcel={handleUploadDataExcel}
        />
      </div>
    </Box>
  );
};

export default PageHeader;
