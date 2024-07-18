import React, { useEffect, useState, useCallback } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ToolbarAlertBanner
} from 'material-react-table';
import {
  cancelRowData,
  downloadBlankExcel,
  downloadDataExcel,
  getData,
  promoGridFilters,
  promoGridGetValidations,
  uploadDataExcel
} from '../../api/promoGridApi';

import PromoGridColumns from './PromoGridColumns';
import RowActions from '../Common/RowActions';
import PageHeader from '../Common/PageHeader';
import PageSection from '../Common/PageSection';
import InfoSnackBar from '../Common/InfoSnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Filters from '../Common/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import RowSelections from '../Common/RowSelections';
import CancelEventDialog from '../Common/CancelEventDialog';
import AddEditEventDialog from './AddEditEventDialog';
import EditEventDialog from './EditEventDialog';
import moment from 'moment';
import { debounce } from 'lodash';
import { getSettings } from './settingsSlice';

const PromoGridData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '', dataTestId: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [rowSelection, setRowSelection] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isHistoricalEvent, setIsHistoricalEvent] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [filterOptions, setFilterOptions] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    active: ['Active']
  });

  const [selectedFilters, setSelectedFilters] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    active: ['Active']
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];
  const fetchFilters = async () => {
    try {
      const response = await promoGridFilters();
      setFilterOptions({
        subsector: response?.subsector,
        category: response?.category,
        brand: response?.brand,
        brandForm: response?.prod_form_name,
        sku: response?.sku,
        active: response?.active || ['Active']
      });
      setIsDataLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  const fetchData = async (pageIndex, pageSize, filters) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const filterParams = Object.keys(filters).reduce((acc, key) => {
        if (
          filters[key] &&
          (Array.isArray(filters[key]) ? !filters[key].includes('All') : filters[key] !== 'All')
        ) {
          acc[key] = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
        } else {
          acc[key] = [];
        }
        return acc;
      }, {});

      const response = await getData(pageIndex, pageSize, filterParams);

      setData(response.results);
      setRowCount(response.count);

      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    debouncedFetchData(pagination.pageIndex, pagination.pageSize, selectedFilters);
  }, [pagination, selectedFilters]);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    if (location.state && location.state.messageData) {
      setIsSnackOpen(true);
      setSnackBar({
        message: location.state.messageData,
        severity: 'success'
      });
      window.history.replaceState(null, '');
    }
  }, [location.state]);

  const handleFilterChange = (filterKey, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: values
    }));
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0
    }));
  };

  const handleCancel = (row = null) => {
    if (row) {
      // Cancel specific row event
      setSelectedEventIds([row.original.unique_event_id]);
      setCancelDialogOpen(true);
    } else if (Object.keys(rowSelection).length > 0) {
      // Cancel selected rows events
      const selectedIds = Object.keys(rowSelection).map((key) => data[key].unique_event_id);
      setSelectedEventIds(selectedIds);
      setCancelDialogOpen(true);
    } else {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Please select at least one event to cancel',
        severity: 'warning'
      });
    }
  };

  const confirmCancel = async () => {
    setIsCanceling(true);
    setIsSaving(true);
    try {
      const payload = {
        unique_event_id: selectedEventIds,
        golden_customer_id: customerId
      };
      await cancelRowData(payload);
      setRowSelection({});
      setIsRefetching(true);

      setCancelDialogOpen(false);
      setIsCanceling(false);
      setIsSaving(false);

      setIsSnackOpen(true);
      setSnackBar({
        message: 'Promo Cancelled successfully !!!',
        severity: 'success'
      });

      await fetchData(pagination.pageIndex, pagination.pageSize, selectedFilters);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while cancelling the data !!!',
        severity: 'error'
      });
      setIsCanceling(false);
      setIsSaving(false);
    }
  };

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
        message: 'Error occured while downloading ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  const handleDataDownloadExcel = async () => {
    try {
      const filterParams = Object.keys(selectedFilters)
        .filter(
          (key) =>
            selectedFilters[key] &&
            (Array.isArray(selectedFilters[key])
              ? !selectedFilters[key].includes('All')
              : selectedFilters[key] !== 'All')
        )
        .reduce((acc, key) => {
          acc[key] = Array.isArray(selectedFilters[key])
            ? selectedFilters[key]
            : [selectedFilters[key]];
          return acc;
        }, {});

      await downloadDataExcel(filterParams);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Excel data downloaded successfully !!!',
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured while data downloading ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  const handleUploadDataExcel = async (event, signal) => {
    try {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          setIsDataLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          const uploadResponse = await uploadDataExcel(formData, { signal });

          if (signal.aborted) {
            setIsDataLoading(false);
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

          const validateResponse = await promoGridGetValidations(uploadResponse.promo_header);

          if (signal.aborted) {
            setIsDataLoading(false);
            event.target.value = null;
            return;
          }

          navigate('/promo-grid-validations', {
            state: { responseData: validateResponse }
          });
          setIsRefetching(true);
          await fetchData(pagination.pageIndex, pagination.pageSize);
          setIsDataLoading(false);
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
            message: 'Error occured while updating the data! Please try again!!!',
            severity: 'error',
            dataTestId: 'snackbar-error'
          });
        }
        event.target.value = null;
        setIsDataLoading(false);
      }
    }
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const table = useMaterialReactTable({
    columns: PromoGridColumns(),
    data,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    muiTableProps: {
      sx: {
        borderCollapse: 'collapse',
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableBodyRowProps: ({ row }) => ({
      onMouseEnter: () => setHoveredRow(row.id),
      onMouseLeave: () => setHoveredRow(null)
    }),
    muiTableBodyCellProps: ({ cell }) => ({
      className: cell.column.id === 'mrt-row-actions' ? 'custom-row-actions' : '',

      sx: {
        border: '0.5px solid rgba(0, 0, 0, 0.23)',
        backgroundColor: grey[100]
      }
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
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    manualPagination: true,
    enableSorting: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    rowCount: rowCount,
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-select', 'unique_event_id'],
        right: ['mrt-row-actions']
      }
    },
    defaultColumn: {
      size: 150
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 50
      }
    },
    renderRowActions: ({ row, table }) => (
      <RowActions
        table={table}
        row={row}
        hoveredRow={hoveredRow}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
      />
    ),
    state: {
      isLoading: isLoading,
      isSaving: isSaving,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      pagination,
      rowSelection
    }
  });

  const selectedRowCount = Object.keys(rowSelection).length;
  const handleAddEventOpen = () => {
    setOpenNewEventDialog(true);
    setIsHistoricalEvent(false);
  };

  const handleAddEventClose = async (event, reason) => {
    setIsEdit(false);
    if (reason && reason === 'backdropClick') return;
    setOpenNewEventDialog(false);
    if (reason === 'add') {
      await fetchData(pagination.pageIndex, pagination.pageSize, selectedFilters);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'New event has been added successfully',
        severity: 'success'
      });
    }
    if (reason === 'edit') {
      await fetchData(pagination.pageIndex, pagination.pageSize, selectedFilters);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Changes saved successfully',
        severity: 'success'
      });
    }
  };

  // Handle Edit
  const handleEdit = (row) => {
    setOpenDialog(true);
    setRowData(row.original);
    setIsEdit(true);
    setSelectedEventIds([row.original.unique_event_id]);
    const startDate = moment(row.original.event_in_store_start_date, 'MM/DD/YYYY');
    const currentDate = moment();
    if (startDate.isBefore(currentDate, 'day')) {
      setIsHistoricalEvent(true);
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpenDialog(false);
    setIsHistoricalEvent(false);
    setCancelDialogOpen(false);
  };

  return (
    <>
      <PageSection>
        <PageHeader
          table={table}
          title="Event promo grid"
          subtitle="Manage events "
          handleAddEventOpen={handleAddEventOpen}
          handleDataDownloadExcel={handleDataDownloadExcel}
          handleDownloadBlankExcel={handleDownloadBlankExcel}
          handleUploadDataExcel={handleUploadDataExcel}
          isDataLoading={isDataLoading}
        />
        <Filters
          isLoading={isLoading}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <RowSelections
          selectedRowCount={selectedRowCount}
          rowCount={rowCount}
          handleCancel={handleCancel}
        />

        <MRT_ToolbarAlertBanner table={table} className="info-message" />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </PageSection>

      <CancelEventDialog
        open={cancelDialogOpen}
        onClose={handleDialogClose}
        onConfirm={confirmCancel}
        eventCount={selectedEventIds.length}
        isCanceling={isCanceling}
      />

      {openNewEventDialog && (
        <AddEditEventDialog
          open={openNewEventDialog}
          handleClose={handleAddEventClose}
          rowData={rowData}
          isEdit={isEdit}
        />
      )}
      {openDialog && (
        <EditEventDialog
          open={openDialog}
          handleClose={handleDialogClose}
          onConfirm={handleAddEventOpen}
          isHistoricalEvent={isHistoricalEvent}
          eventIds={selectedEventIds}
        />
      )}
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

export default PromoGridData;
