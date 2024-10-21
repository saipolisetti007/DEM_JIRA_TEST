/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import PageSection from '../Common/PageSection';
import { Box, Button, Typography } from '@mui/material';
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
import RowSelections from '../Common/RowSelections';
import BlankExcelDownload from '../Common/BlankExcelDownload';
import ExcelWithDataDownload from '../Common/ExcelWithDataDownload';
import {
  downloadBlankExcel,
  downloadDataExcel,
  downloadSelectedDataExcel,
  uploadDataExcel,
  maualDaList
} from '../../api/manualDaApi';
import InfoSnackBar from '../Common/InfoSnackBar';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadFileDialog from '../Common/UploadFileDialog';
import { SnackBarType } from '../ThresholdSettings/ThresholdSettingsData';
import { useAppSelector } from '../../store/hooks';

type PaginationType = {
  pageIndex: number;
  pageSize: number;
};
const ManualDaList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSaving] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBarType | null>({
    message: '',
    severity: '',
    dataTestId: ''
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    da_id: false,
    da_line: false,
    category: false,
    da_name: false,
    total_volume_su: false,
    sub_sector: false,
    description: false,
    customized_code: false,
    vol_1: false,
    vol_2: false,
    vol_3: false,
    vol_4: false,
    vol_5: false,
    vol_6: false,
    vol_7: false,
    vol_8: false,
    vol_9: false,
    vol_10: false,
    vol_11: false,
    vol_12: false,
    vol_13: false,
    vol_14: false,
    vol_15: false,
    vol_16: false,
    vol_17: false,
    vol_18: false,
    vol_19: false,
    vol_20: false,
    vol_21: false,
    vol_22: false,
    vol_23: false,
    vol_24: false,
    status: false
  });
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 10
  });

  const selectedRowCount: number = Object.keys(rowSelection).length;
  const { userData, customerId } = useAppSelector((state) => state.userProfileData);
  const region: string = userData?.region;

  // Fetch Manual Da List data
  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await maualDaList();
      setData(response.results);
      setIsLoading(false);
      setRowCount(response.results.length);
      setIsRefetching(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  // Handle snackbar close
  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  // Handle dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the upload file dialog.
  const handleClose = () => {
    setOpen(false);
  };

  // Handle downloading a blank Excel template
  const handleDownloadBlankExcel = async () => {
    try {
      await downloadBlankExcel();
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Excel template downloaded successfully !!!',
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while downloading ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  // Handle download data Excel
  const handleDataDownloadExcel = async () => {
    try {
      await downloadDataExcel();
      setIsSnackOpen(true);
      setSnackBar({
        message: `${data.length} Manual DAs have been exported successfully`,
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while data downloading ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  // Handle download selected data Excel
  const handleSelectedDataDownloadExcel = async () => {
    const selectedIds = Object.keys(rowSelection).map(
      (key) => `${data[key].da_id}_${data[key].da_line}`
    );
    if (selectedIds.length === 0) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Please select at least one event to export',
        severity: 'warning'
      });
      return;
    }

    try {
      await downloadSelectedDataExcel(selectedIds);
      setIsSnackOpen(true);
      setSnackBar({
        message: `${selectedIds.length}/${data.length} Manual DAs have been exported successfully`,
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while downloading selected data! Please try again !!!',
        severity: 'error'
      });
    }
  };

  //Handle downloading selected data with split options as an Excel file
  const handleDataDownloadOptionExcel = () => {
    console.log('Downloading data with options as an Excel file');
  };

  // Handle upload data Excel
  const handleUploadDataExcel = async (event, signal) => {
    try {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          const formData = new FormData();
          formData.append('file', file);
          const uploadResponse = await uploadDataExcel(formData);
          if (signal.aborted) {
            event.target.value = null;
            return;
          }

          if (uploadResponse.message) {
            setIsSnackOpen(true);
            setSnackBar({
              message: uploadResponse.message,
              severity: 'success'
            });
          }

          navigate('/manual-da-validations', {
            state: { responseData: uploadResponse }
          });
          setIsRefetching(true);
          event.target.value = null;
        } else {
          alert('Please select an excel file');
        }
      } else {
        alert('Please select a file');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        const response = error.response?.data;
        setIsSnackOpen(true);
        if (error.response?.status === 403) {
          setSnackBar({
            message: response.error,
            severity: 'error'
          });
        } else {
          setSnackBar({
            message: 'Error occurred while updating the data! Please try again!!!',
            severity: 'error',
            dataTestId: 'snackbar-error'
          });
        }
        event.target.value = null;
      }
    }
  };

  // Handle column visibility change
  const handleColumnVisibilityChange = (changedColumnId: string, newVisibility: boolean) => {
    setColumnVisibility((prevColumnVisibility) => ({
      ...prevColumnVisibility,
      [changedColumnId]: newVisibility
    }));
  };
  // Initialize table with material-react-table
  const table = useMaterialReactTable({
    columns: ManualDaColumns({ region }),
    data,
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
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
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
    enableRowActions: true,
    enableColumnActions: false,
    enableFacetedValues: true,
    enableColumnPinning: true,
    manualPagination: true,
    enableSorting: false,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: () => handleColumnVisibilityChange,
    onPaginationChange: setPagination,
    rowCount: rowCount,
    initialState: {
      showColumnFilters: true,
      density: 'compact',
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
      <RowActions row={row} hoveredRow={hoveredRow} cancelTooltip="Cancel Event" isEdit={false} />
    ),
    state: {
      showProgressBars: isRefetching,
      isLoading: isLoading,
      pagination,
      isSaving: isSaving,
      showAlertBanner: isError,
      columnVisibility,
      rowSelection
    }
  });
  return (
    <>
      <PageSection>
        <Box className="flex justify-between items-center">
          <DefaultPageHeader title="Manual DA" subtitle="Manage Manual DA and shipments" />
          <Box className="flex items-center gap-1">
            <ExcelWithDataDownload handleDataDownloadExcel={handleDataDownloadExcel} />
            <BlankExcelDownload handleDownloadBlankExcel={handleDownloadBlankExcel} />
            <Button
              variant="outlined"
              color="success"
              className="rounded-full ml-4"
              startIcon={<UploadFileIcon />}
              onClick={handleClickOpen}
              data-testid="upload">
              Import DA
            </Button>
            <UploadFileDialog
              open={open}
              handleClose={handleClose}
              handleUploadDataExcel={handleUploadDataExcel}
            />
          </Box>
        </Box>

        <Box className="flex justify-between items-center">
          <Filters
            isLoading={false}
            filterOptions=""
            selectedFilters=""
            onFilterChange={() => {}}
          />
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
          {/* @ts-ignore */}
          <Button color="create" variant="outlined" size="small">
            Created: 50
          </Button>
          {/* @ts-ignore */}
          <Button color="cancel" variant="outlined" size="small">
            Canceled: 385
          </Button>
          {/* @ts-ignore */}
          <Button color="expired" variant="outlined" size="small">
            Expired: 385
          </Button>
        </Box>
        <RowSelections
          isExportDropdown={true}
          cancelTitle="Cancel DA"
          exportTitle="Export DA"
          exportMain="Export DA"
          exportOption="Export DA with split"
          selectedRowCount={selectedRowCount}
          rowCount={rowCount}
          handleCancel={() => {}}
          handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
          handleSelectedDataOptionExcel={handleDataDownloadOptionExcel}
        />
        <div className="manualda-table">
          <MRT_ToolbarAlertBanner table={table} className="info-message" />
          <MRT_TableContainer table={table} />
          <MRT_TablePagination table={table} />
        </div>
      </PageSection>
      {isSnackOpen && snackBar && (
        <InfoSnackBar
          isOpen={isSnackOpen}
          message={snackBar.message}
          severity={snackBar.severity}
          onClose={handleSnackbar}
          dataTestId={snackBar.dataTestId}
        />
      )}
    </>
  );
};

export default ManualDaList;
