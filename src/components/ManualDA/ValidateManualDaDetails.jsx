/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from '@mui/material';
import {
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import React, { useState } from 'react';
import ValidateManualDaColumns from './ValidateManualDaColumns';

const ValidateManualDaDetails = ({ handleValidate, handleNext, isValid, data }) => {
  const [tableData] = useState(data);
  const [isLoading] = useState(false);
  const [isRefetching] = useState(false);
  const [isError] = useState(false);
  const [validationErrors] = useState({});
  const [validationWarnings] = useState({});

  const handleInputChange = (newValue, rowIndex, accessorKey, helperMessage, validationType) => {
    console.log(
      'handleInputChange',
      newValue,
      rowIndex,
      accessorKey,
      helperMessage,
      validationType
    );
  };
  // Initialize table with data and columns
  const table = useMaterialReactTable({
    data: tableData,
    columns: ValidateManualDaColumns({
      validationErrors,
      validationWarnings,
      handleInputChange
    }),
    enableEditing: true,
    editDisplayMode: 'table',
    enableSorting: false,
    enableColumnActions: false,
    muiTableProps: {
      sx: {
        borderCollapse: 'collapse',
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
      })
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
    initialState: {
      density: 'compact',
      showGlobalFilter: true
    },
    state: {
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching
    }
  });

  return (
    <>
      <Box className="flex items-center justify-between my-2">
        <Typography variant="h6"></Typography>
        <Box className="flex gap-2">
          <Button color="success" variant="outlined" onClick={handleValidate}>
            Validate
          </Button>
          <Button onClick={handleNext} color="primary" variant="contained" disabled={!isValid}>
            Submit
          </Button>
        </Box>
      </Box>
      <Box className="flex items-center justify-between my-4">
        <Typography variant="h6">DA Status: </Typography>
      </Box>

      <Box className="my-4">
        <MRT_ToolbarAlertBanner table={table} />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </Box>
    </>
  );
};

export default ValidateManualDaDetails;
