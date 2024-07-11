import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadExcelData from './UploadExcelData';
import ExcelWithDataDownload from './ExcelWithDataDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BlankExcelDownload from './BlankExcelDownload';
import UploadFileDialog from './UploadFileDialog';

const PageHeader = ({
  title,
  subtitle,
  isDataLoading,
  handleAddEventOpen,
  handleDataDownloadExcel,
  handleDownloadBlankExcel,
  handleUploadDataExcel
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileTypeValid, setFileTypeValid] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setFileTypeValid(null);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setFileTypeValid(
      newFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  };

  const handleSave = async () => {
    if (file) {
      const event = { target: { files: [file] } };
      await handleUploadDataExcel(event); // Upload the file when Save button is clicked
      handleClose();
    }
  };

  return (
    <Box className="py-4">
      <div className="flex items-center justify-between gap-8 pb-8">
        <div>
          <Typography component="h1" variant="h2" color="primary">
            {title}
          </Typography>
          <Typography component="h2" variant="body1">
            {subtitle}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <UploadExcelData
            handleClickOpen={handleClickOpen}
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
            onClick={handleAddEventOpen}>
            Add New Event
          </Button>
        </div>
        <UploadFileDialog
          open={open}
          handleClose={handleClose}
          handleFileChange={handleFileChange}
          handleSave={handleSave}
          fileTypeValid={fileTypeValid}
        />
      </div>
      <hr />
    </Box>
  );
};

export default PageHeader;
