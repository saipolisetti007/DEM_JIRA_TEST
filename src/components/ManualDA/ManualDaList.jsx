/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import PageSection from '../Common/PageSection';
import { Box, Button, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import ManualDaColumns from './ManualDaColumns';
import RowActions from '../Common/RowActions';
import { grey } from '@mui/material/colors';
import ManageColumns from '../Common/ManageColumns';
import Filters from '../Common/Filters';
import { useSelector } from 'react-redux';
import RowSelections from '../Common/RowSelections';

const ManualDaList = () => {
  const data = [
    {
      da_id: '123',
      da_line: '456',
      status: 'created',
      country_code: 'US',
      customer_identifier: '2000038335',
      event_description: 'Test',
      rdd_start: '2021-10-10',
      ship_start: '2021-10-10',
      item_gtin: '123',
      case_gtin: '456',
      fpc: '789'
    }
  ];
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isDataLoading, setIsDataLoading] = useState(false);
  // const [isRefetching, setIsRefetching] = useState(false);
  // const [isError, setIsError] = useState(false);
  //const [isSnackOpen, setIsSnackOpen] = useState(false);
  // const [snackBar, setSnackBar] = useState({ message: '', severity: '', dataTestId: '' });
  // const [isSaving, setIsSaving] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    da_id: false,
    da_line: false,
    da_name: false,
    sub_sector: false,
    category: false,
    description: false,
    customized_code: false
  });
  //const [rowCount, setRowCount] = useState(0);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const selectedRowCount = Object.keys(rowSelection).length;
  const { userData } = useSelector((state) => state.userProfileData);
  const region = userData?.region;

  // Handle column visibility change
  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    setColumnVisibility((prevColumnVisibility) => ({
      ...prevColumnVisibility,
      [changedColumnId]: newVisibility
    }));
  };

  // Initialize table with material-react-table
  const table = useMaterialReactTable({
    columns: ManualDaColumns({ region }),
    data,
    editDisplayMode: 'row',
    enableEditing: true,
    muiTableProps: {
      sx: {
        borderCollapse: 'collapse',
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableBodyCellProps: ({ cell }) => ({
      className: cell.column.id === 'mrt-row-actions' ? 'custom-row-actions' : '',

      sx: {
        border: '0.5px solid rgba(0, 0, 0, 0.23)',
        backgroundColor: grey[100]
      }
    }),
    muiTableBodyRowProps: ({ row }) => ({
      onMouseEnter: () => setHoveredRow(row.id),
      onMouseLeave: () => setHoveredRow(null)
    }),
    muiTableHeadCellProps: ({ column }) => ({
      sx: (theme) => ({
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        textTransform: 'initial',
        verticalAlign: 'middle'
      }),
      className: column.id === 'mrt-row-actions' ? 'custom-row-actions' : ''
    }),
    // muiToolbarAlertBannerProps: isError
    //   ? {
    //       color: 'error',
    //       children: 'Network Error. Could not fetch the data.'
    //     }
    //   : undefined,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    manualPagination: true,
    enableSorting: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onPaginationChange: setPagination,
    // rowCount: rowCount,
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-select'],
        right: ['mrt-row-actions']
      }
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 100
      }
    },
    renderRowActions: ({ row, table }) => (
      <RowActions
        table={table}
        row={row}
        hoveredRow={hoveredRow}
        cancelTooltip="Cancel DA"
        isEdit={false}
      />
    ),
    state: {
      // isLoading: isLoading,
      // isSaving: isSaving,
      // showAlertBanner: isError,
      // showProgressBars: isRefetching,
      pagination,
      rowSelection,
      columnVisibility
    }
  });
  return (
    <PageSection>
      <Box className="flex justify-between items-center">
        <DefaultPageHeader title="Manual DA" subtitle="Manage Manual DA and shipments" />
        <Button
          variant="outlined"
          color="success"
          className="rounded-full ml-4"
          startIcon={<UploadFileIcon />}>
          Import DA
        </Button>
      </Box>

      <Box className="flex justify-between items-center">
        <Filters isLoading="" filterOptions="" selectedFilters="" onFilterChange="" />
        <ManageColumns
          columns={table.options.columns}
          columnVisibility={columnVisibility}
          cookieName="manualDaColumnVisibility"
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </Box>
      <hr />
      <Box className="flex items-center gap-2 my-4">
        <Typography variant="h6" component="span">
          DA Status:
        </Typography>
        <Button color="success" variant="outlined" size="small">
          Submitted: 157
        </Button>
        <Button color="error" variant="outlined" size="small">
          Error: 87
        </Button>
        <Button color="create" variant="outlined" size="small">
          Created: 50
        </Button>
        <Button color="cancel" variant="outlined" size="small">
          Canceled: 385
        </Button>
        <Button color="expired" variant="outlined" size="small">
          Expired: 385
        </Button>
      </Box>
      <RowSelections
        selectedRowCount={selectedRowCount}
        //rowCount={rowCount}
        handleCancel=""
        handleSelectedDataDownloadExcel=""
      />
      <div className="promogrid-table">
        <MRT_ToolbarAlertBanner table={table} className="info-message" />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </div>
    </PageSection>
  );
};

export default ManualDaList;
