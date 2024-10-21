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
  uploadDataExcel,
  downloadSelectedDataExcel
} from '../../api/promoGridApi';
import PromoGridColumns, { PromoGridColumnsType } from './PromoGridColumns';
import RowActions from '../Common/RowActions';
import PageHeader from '../Common/PageHeader';
import PageSection from '../Common/PageSection';
import InfoSnackBar from '../Common/InfoSnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Filters from '../Common/Filters';
import { grey } from '@mui/material/colors';
import RowSelections from '../Common/RowSelections';
import CancelEventDialog from '../Common/CancelEventDialog';
import AddEditEventDialog from './AddEditEventDialog';
import EditEventDialog from './EditEventDialog';
import moment from 'moment';
import { debounce } from 'lodash';
import { getSettings } from './settingsSlice';
import { reduceFilters, mapFilterParams } from '../../utils/filterUtils';
import ManageColumns from '../Common/ManageColumns';
import createDebouncedFetchFilters from '../../utils/debounceUtils';
import DefaultPageLoader from '../Common/DefaultPageLoader';
import { fetchEvents } from './eventsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SnackBarType } from '../ThresholdSettings/ThresholdSettingsData';

export type FilterOptionsType = {
  subsector: string[];
  category: string[];
  brand: string[];
  brandForm: string[];
  sku: string[];
  prodName: string[];
  customerItemNumber: string[];
  custFlag: string[];
  active: string[];
  customerId?: string[];
};

type RowType = {
  original: { cpf_id: string; event_in_store_start_date: string };
};
// PromoGridData component
const PromoGridData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<PromoGridColumnsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBarType | null>({
    message: '',
    severity: '',
    dataTestId: ''
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Record<string, any> | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isHistoricalEvent, setIsHistoricalEvent] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const { customerId } = useAppSelector((state) => state.userProfileData);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: [],
    custFlag: [],
    active: ['Active']
  });

  const [selectedFilters, setSelectedFilters] = useState<FilterOptionsType>({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: [],
    custFlag: [],
    active: ['Active']
  });

  const dispatch = useAppDispatch();
  // Fetch settings on component mount
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const { userData } = useAppSelector((state) => state.userProfileData);

  const region = userData?.region;

  // Fetch events when customerId changes
  useEffect(() => {
    if (customerId) {
      dispatch(fetchEvents(customerId));
    }
  }, [customerId]);

  // Fetch filter options based on selected filters
  const fetchFilters = async (filters: FilterOptionsType | {} = {}) => {
    try {
      if (customerId) {
        (filters as FilterOptionsType).customerId = [customerId];
      }
      const response = await promoGridFilters(filters);
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        subsector: response?.subsector || prevOptions.subsector,
        category: response?.category || prevOptions.category,
        brand: response?.brand || prevOptions.brand,
        brandForm: response?.prod_form_name || prevOptions.brandForm,
        sku: response?.sku || prevOptions.sku,
        prodName: response?.prod_name || prevOptions.prodName,
        customerItemNumber: response?.customer_item_number || prevOptions.customerItemNumber,
        custFlag: response?.cust_flag || prevOptions.custFlag,
        active: response?.active || prevOptions.active
      }));
      setIsDataLoading(false);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        customerId: location?.state?.selectedCustomer
          ? [location.state.selectedCustomer]
          : [customerId]
      }));
      setFiltersUpdated(true);
    } catch (error) {
      setFiltersUpdated(true);
      setIsLoading(false);
      setIsError(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  // Update selected filters when customerId changes
  useEffect(() => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      customerId: customerId ? [customerId] : []
    }));
  }, [customerId]);

  // Reset pagination when customerId changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0
    }));
  }, [customerId]);

  // Fetch data based on pagination and filters
  const fetchData = async (pageIndex, pageSize, filters?) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const filterParams = reduceFilters(filters);
      const mappedFilterParams = mapFilterParams(filterParams);
      const response = await getData(pageIndex, pageSize, mappedFilterParams);

      setData(response.results);
      setRowCount(response.count);

      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  // Debounced fetch data function
  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);
  // Fetch data when filters or pagination changes
  useEffect(() => {
    if (filtersUpdated) {
      debouncedFetchData(pagination.pageIndex, pagination.pageSize, selectedFilters);
    }

    return () => {
      debouncedFetchData.cancel();
    };
  }, [pagination, selectedFilters, filtersUpdated]);

  // Fetch filters when customerId changes
  useEffect(() => {
    fetchFilters(selectedFilters);
  }, [customerId]);
  // Show snackbar message if location state has messageData
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

  // Debounced fetch filters function
  const debouncedFetchFilters = useCallback(
    createDebouncedFetchFilters(promoGridFilters, setFilterOptions, setIsSnackOpen, setSnackBar, [
      'eventType',
      'eventSubtype',
      'status',
      'comments'
    ]),
    []
  );

  // Handle filter change
  const handleFilterChange = (filterKey, values) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterKey]: filterKey === 'customerId' ? [values] : values
    };

    setSelectedFilters(updatedFilters);
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0
    }));

    // Debounced fetching of updated filter options based on the current selections
    debouncedFetchFilters(updatedFilters);
  };
  // Handle cancel event
  const handleCancel = (row: RowType | null = null) => {
    if (row) {
      // Cancel specific row event
      setSelectedEventIds([row.original.cpf_id]);
      setCancelDialogOpen(true);
    } else if (Object.keys(rowSelection).length > 0) {
      // Cancel selected rows events
      const selectedIds = Object.keys(rowSelection).map((key) => data[key].cpf_id);
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
  // Confirm cancel event
  const confirmCancel = async () => {
    setIsCanceling(true);
    setIsSaving(true);
    try {
      const payload = {
        cpf_id: selectedEventIds,
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
      const remainingrows = data.length - selectedEventIds.length;
      const newPageIndex = remainingrows === 0 ? pagination.pageIndex - 1 : pagination.pageIndex;
      // Update pagination state before calling fetchData
      setPagination((prev) => ({
        ...prev,
        pageIndex: newPageIndex
      }));
      await fetchData(newPageIndex, pagination.pageSize, selectedFilters);
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
  // Handle download blank Excel template
  const handleDownloadBlankExcel = async () => {
    try {
      await downloadBlankExcel(customerId);
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
      const filterParams = reduceFilters(selectedFilters);
      const mappedFilterParams = mapFilterParams(filterParams);
      await downloadDataExcel(mappedFilterParams);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Excel data downloaded successfully !!!',
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
    const selectedIds = Object.keys(rowSelection).map((key) => data[key].cpf_id);

    if (selectedIds.length === 0) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Please select at least one event to export',
        severity: 'warning'
      });
      return;
    }

    try {
      await downloadSelectedDataExcel(selectedIds, customerId);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Selected Excel data downloaded successfully !!!',
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
  // Handle upload data Excel
  const handleUploadDataExcel = async (event, signal) => {
    try {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          setIsDataLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          const uploadResponse = await uploadDataExcel(formData);

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
            message: 'Error occurred while updating the data! Please try again!!!',
            severity: 'error',
            dataTestId: 'snackbar-error'
          });
        }
        event.target.value = null;
        setIsDataLoading(false);
      }
    }
  };

  // Handle snackbar close
  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
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
    columns: PromoGridColumns({ region }),
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
    onColumnVisibilityChange: () => handleColumnVisibilityChange,
    onPaginationChange: setPagination,
    rowCount: rowCount,
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-select', 'cpf_id'],
        right: ['mrt-row-actions']
      }
    },
    defaultColumn: {
      size: 150
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 100
      }
    },
    renderRowActions: ({ row }) => (
      <RowActions
        row={row}
        hoveredRow={hoveredRow}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        cancelTooltip="Cancel Event"
        editTooltip="Edit Event"
        isEdit={true}
      />
    ),
    state: {
      isLoading: isLoading,
      isSaving: isSaving,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      pagination,
      rowSelection,
      columnVisibility
    }
  });

  const selectedRowCount = Object.keys(rowSelection).length;
  // Handle add event dialog open
  const handleAddEventOpen = () => {
    setOpenNewEventDialog(true);
    setIsHistoricalEvent(false);
  };
  // Handle add event dialog close
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
  const handleEdit = (row: RowType) => {
    setOpenDialog(true);
    setRowData(row.original);
    setIsEdit(true);
    setSelectedEventIds([row.original.cpf_id]);
    const startDate = moment(row.original.event_in_store_start_date, 'MM/DD/YYYY');
    const currentDate = moment();
    if (startDate.isBefore(currentDate, 'day')) {
      setIsHistoricalEvent(true);
    }
  };
  // Handle dialog close
  const handleDialogClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpenDialog(false);
    setIsHistoricalEvent(false);
    setCancelDialogOpen(false);
  };
  // Show loader if filters are not updated
  if (!filtersUpdated) {
    return <DefaultPageLoader />;
  }

  return (
    <>
      <PageSection>
        <PageHeader
          title="Event Promo Plan"
          subtitle="Manage events "
          handleAddEventOpen={handleAddEventOpen}
          handleDataDownloadExcel={handleDataDownloadExcel}
          handleDownloadBlankExcel={handleDownloadBlankExcel}
          handleUploadDataExcel={handleUploadDataExcel}
          isDataLoading={isDataLoading}
        />
        <div className="flex items-end justify-end mt-4 mb-2">
          <ManageColumns
            columns={table.options.columns}
            columnVisibility={columnVisibility}
            cookieName="columnVisibility"
            onColumnVisibilityChange={handleColumnVisibilityChange}
          />
        </div>
        <hr />
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
          handleSelectedDataDownloadExcel={handleSelectedDataDownloadExcel}
          isExportDropdown={false}
          cancelTitle="Cancel events"
          exportTitle="Export files"
          exportMain="Export files"
          exportOption=""
        />
        <div className="promogrid-table">
          <MRT_ToolbarAlertBanner table={table} className="info-message" />
          <MRT_TableContainer table={table} />
          <MRT_TablePagination table={table} />
        </div>
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
          customerId={customerId ?? ''}
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
