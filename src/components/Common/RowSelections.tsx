import React from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CancelIcon from '@mui/icons-material/Cancel';

type RowSelectionsPropsType = {
  isExportDropdown: boolean;
  cancelTitle: string;
  exportTitle: string;
  exportMain: string;
  exportOption: string;
  rowCount: number;
  selectedRowCount: number;
  handleCancel: () => void;
  handleSelectedDataDownloadExcel: () => void;
  handleSelectedDataOptionExcel?: () => void;
};

// RowSelections is a functional component that displays the number of selected rows and provides action buttons.
const RowSelections = ({
  isExportDropdown, // Boolean to determine if the export dropdown should be displayed.
  cancelTitle, // Title for the cancel action.
  exportTitle, // Title for the export action.
  exportMain, // Name for the export action.
  exportOption, // Options for the export action.
  rowCount, // Total number of rows.
  selectedRowCount, // Number of rows that are currently selected.
  handleCancel, // Callback function to handle the cancel action.
  handleSelectedDataDownloadExcel, // Callback function to handle exporting selected data to an Excel file.
  handleSelectedDataOptionExcel // Callback function to handle exporting selected data with options to an Excel file.
}: RowSelectionsPropsType) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="flex gap-2 items-center justify-end my-2">
      <Typography component="span" variant="body2">
        <strong>{selectedRowCount}</strong> from <strong>{rowCount}</strong> selected:
      </Typography>
      <Tooltip title={cancelTitle} arrow placement="top">
        <IconButton color="primary" size="small" onClick={() => handleCancel()}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      {isExportDropdown ? (
        <Tooltip title={exportTitle} arrow placement="top">
          <IconButton color="primary" size="small" onClick={handleClick}>
            <ImportExportIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={exportTitle} arrow placement="top">
          <IconButton color="primary" size="small" onClick={handleSelectedDataDownloadExcel}>
            <ImportExportIcon />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={anchorEl}
        id="export-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleSelectedDataDownloadExcel}>{exportMain}</MenuItem>
        <MenuItem onClick={handleSelectedDataOptionExcel}>{exportOption}</MenuItem>
      </Menu>
    </Box>
  );
};

export default RowSelections;
