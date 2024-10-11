/* eslint-disable no-unused-vars */
import { Alert, Box, Button, Typography } from '@mui/material';
import {
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import React, { useMemo, useState } from 'react';
import ValidateShipmentProfileColumns from './ValidateShipmentProfileColumns';

// Inner table component
const InnerTable = ({ subData }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [validationWarnings, setValidationWarnings] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

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
  const innerTable = useMaterialReactTable({
    columns: ValidateShipmentProfileColumns({
      validationErrors,
      validationWarnings,
      handleInputChange
    }),
    data: subData,
    enableRowSelection: true,
    enableEditing: true,
    editDisplayMode: 'table',
    enableTopToolbar: false,
    muiTableHeadCellProps: {
      sx: {
        display: 'none'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: 'none',
        padding: '0.5rem'
      }
    }
  });

  return (
    <div className="inner-table">
      <MRT_TableContainer table={innerTable} />
      {/* Button and text box for calculating the sum */}

      <div className="flex my-4 justify-end items-center gap-2 mr-16">
        <Button variant="outlined" color="primary">
          Equalize
        </Button>
        <Alert icon={false} severity="error" sx={{ padding: '0px 8px' }}>
          <Typography color="error">Sum = 120</Typography>
        </Alert>
      </div>
    </div>
  );
};

const ValidateShipmentProfiles = ({ handleValidate, handleNext, isValid, data }) => {
  const [tableData] = useState(data);
  const [isLoading] = useState(false);
  const [isRefetching] = useState(false);
  const [isError] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'destination_profile',
        header: 'Destination Profile '
      },
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        accessorKey: 'golden_customer_id',
        header: 'Golden Customer ID'
      },
      {
        accessorKey: 'ship_to',
        header: 'Ship to '
      },
      {
        accessorKey: 'percentage_split',
        header: '% Split'
      }
    ],
    []
  );

  // Initialize table with data and columns
  const table = useMaterialReactTable({
    data: tableData,
    columns,
    enableEditing: false,
    enableSorting: false,
    enableColumnActions: false,
    renderDetailPanel: ({ row }) => {
      const subData = row.original.subRows || [];
      return <InnerTable subData={subData} />;
    },

    muiTableProps: {
      sx: {
        border: 'none'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: 'none'
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
    <div>
      <Box className="flex items-center justify-between my-2">
        <Typography variant="h6"></Typography>
        <Box className="flex gap-2">
          <Button color="success" variant="outlined" onClick={handleValidate}>
            Validate
          </Button>
          <Button onClick={handleNext} color="primary" variant="contained" disabled={!isValid}>
            Next
          </Button>
        </Box>
      </Box>
      <Box className="flex items-center justify-between my-4">
        <Typography variant="h6">DA Status: </Typography>
        <Box className="flex gap-2">
          <Button color="primary" variant="outlined">
            Equalize all splits
          </Button>
        </Box>
      </Box>
      <Box className="my-4">
        <MRT_ToolbarAlertBanner table={table} />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </Box>
    </div>
  );
};

export default ValidateShipmentProfiles;
