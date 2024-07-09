import React, { useEffect, useState } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ToolbarAlertBanner
} from 'material-react-table';
import {
  addNewRowData,
  cancelRowData,
  downloadBlankExcel,
  downloadDataExcel,
  getData,
  promoGridFilters,
  promoGridGetValidations,
  updateRowData,
  uploadDataExcel
} from '../../api/promoGridApi';

import { handleChangeValidate, handleValidate, parseValues } from '../../utils/commonMethods';
import AddEditRow from '../Common/AddEditRow';
import PromoGridColumns from './PromoGridColumns';
import RowActions from '../Common/RowActions';
import PageHeader from '../Common/PageHeader';
import PageSection from '../Common/PageSection';
import InfoSnackBar from '../Common/InfoSnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Filters from '../Common/Filters';
import { useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import RowSelections from '../Common/RowSelections';
import CancelEventDialog from '../Common/CancelEventDialog';

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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    active: ['Active']
  });

  const [selectedFilters, setSelectedFilters] = useState({
    subsector: '',
    category: '',
    brand: '',
    brandForm: '',
    sku: '',
    active: 'Active'
  });

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

  const fetchData = async (pageIndex, pageSize) => {
    setIsLoading(true);
    try {
      const filterParams = Object.keys(selectedFilters)
        .filter(
          (key) =>
            selectedFilters[key] &&
            (Array.isArray(selectedFilters[key])
              ? !selectedFilters[key].includes('All')
              : selectedFilters[key] !== 'All')
        )
        .map((key) => `${key}=${selectedFilters[key]}`)
        .join('&');
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

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize);
  }, [pagination, selectedFilters]);

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

  // Validate Values
  const validateValues = (values) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      setIsSaving(false);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const transformErrors = (response) => {
    return response?.errors.reduce((acc, { field, error }) => {
      acc[field] = error;
      return acc;
    }, {});
  };
  const stringFields = [
    'event_description',
    'umbrella_event',
    'comments',
    'event_sales_channel',
    'item_type',
    'bu',
    'product_id',
    'id_type',
    'country_code',
    'promoted_product_group_id',
    'distribution_profile',
    'status',
    'event_string_property_1',
    'event_string_property_2',
    'event_string_property_3',
    'event_string_property_4',
    'event_string_property_5',
    'offer_type'
  ];

  // CREATE action
  const handleCreate = async ({ values, table }) => {
    const newValues = { ...values, golden_customer_id: customerId ?? '' };
    setIsSaving(true);
    const parsedValues = parseValues(newValues, stringFields);
    if (validateValues(newValues)) {
      try {
        await addNewRowData(parsedValues);
        table.setCreatingRow(null);
        setIsRefetching(true);
        await fetchData(pagination.pageIndex, pagination.pageSize);
        setIsSaving(false);
        setIsSnackOpen(true);
        setSnackBar({
          message: 'New data added successfully !!!',
          severity: 'success'
        });
      } catch (error) {
        setIsSaving(false);
        const response = error.response?.data;
        if (error.response?.status === 403) {
          setValidationErrors({
            golden_customer_id: "You don't have permissions to create/edit event for this customer"
          });
        } else {
          const transformedErrors = transformErrors(response);
          setValidationErrors(transformedErrors);
        }
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Error occured while adding the data !!!',
          severity: 'error'
        });
      }
    }
  };

  // UPDATE action
  const handleUpdate = async ({ values, table }) => {
    setIsSaving(true);
    if (validateValues(values)) {
      try {
        await updateRowData(values);
        table.setEditingRow(null);
        setIsRefetching(true);
        await fetchData(pagination.pageIndex, pagination.pageSize);
        setIsSaving(false);
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Data Updated successfully !!!',
          severity: 'success'
        });
      } catch (error) {
        setIsSaving(false);
        const response = error.response?.data;
        if (error.response?.status === 403) {
          setValidationErrors({ golden_customer_id: response.detail });
        } else {
          const transformedErrors = transformErrors(response);
          setValidationErrors(transformedErrors);
        }
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Error occured while updating the data !!!',
          severity: 'error'
        });
      }
    }
  };

  const handleCancel = (row = null) => {
    if (Object.keys(rowSelection).length > 0) {
      const selectedIds = Object.keys(rowSelection).map((key) => data[key].unique_event_id);
      setSelectedEventIds(selectedIds);
      setCancelDialogOpen(true);
    } else if (row) {
      setSelectedEventIds([row.original.unique_event_id]);
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
    try {
      const payload = {
        unique_event_id: selectedEventIds,
        golden_customer_id: customerId
      };
      await cancelRowData(payload);
      // to clear the row selection state
      setRowSelection({});

      setIsRefetching(true);
      setIsSaving(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Promo Cancelled successfully !!!',
        severity: 'success'
      });
      await fetchData(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      setIsSaving(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while cancelling the data !!!',
        severity: 'error'
      });
    } finally {
      setCancelDialogOpen(false);
    }
  };

  const handleChange = (event, validationType, accessorKey) => {
    const newValue = event.target.value;
    let errorMessage = handleChangeValidate(newValue, validationType);

    setValidationErrors({
      ...validationErrors,
      [accessorKey]: errorMessage
    });
  };

  const clearEventErrors = (value, accessorKey) => {
    if (accessorKey === 'event_type' && validationErrors?.event_subtype) {
      validationErrors.event_subtype = null;
    }
    if (accessorKey === 'event_subtype' && validationErrors?.event_type) {
      validationErrors.event_type = null;
    }

    if (accessorKey === 'event_type') {
      validationErrors.event_subtype = 'Required';
    }

    let errorMessage = handleChangeValidate(value);
    setValidationErrors({
      ...validationErrors,
      [accessorKey]: errorMessage
    });
  };

  const validateData = (data) => {
    return {
      golden_customer_id: handleValidate('integerValidation', 'required', data.golden_customer_id),
      event_type: handleValidate('', 'required', data.event_type),
      event_subtype: handleValidate('', 'required', data.event_subtype),
      event_sales_channel: handleValidate('stringValidation', 'required', data.event_sales_channel),
      item_type: handleValidate('stringValidation', 'required', data.item_type),
      product_id: handleValidate('stringValidation', 'required', data.product_id),
      id_type: handleValidate('stringValidation', 'required', data.id_type),
      customer_item_number: handleValidate(
        'integerValidation',
        'required',
        data.customer_item_number
      ),
      country_code: handleValidate('stringValidation', 'required', data.country_code),
      event_in_store_start_date: handleValidate('', 'required', data.event_in_store_start_date),
      event_in_store_end_date: handleValidate('', 'required', data.event_in_store_end_date),
      event_publish_to_demand: handleValidate('', 'required', data.event_publish_to_demand)
    };
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
          acc[key] = selectedFilters[key];
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

  const handleUploadDataExcel = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          setIsDataLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          const uploadResponse = await uploadDataExcel(formData);

          // Check for messages from the uploadResponse and show snackbar
          if (uploadResponse.message) {
            setIsSnackOpen(true);
            setSnackBar({
              message: uploadResponse.message,
              severity: 'success'
            });
          }

          const validateResponse = await promoGridGetValidations(uploadResponse.promo_header);
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
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const table = useMaterialReactTable({
    columns: PromoGridColumns({ validationErrors, handleChange, clearEventErrors }),
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
    onCreatingRowSave: handleCreate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdate,
    onEditingRowCancel: () => setValidationErrors({}),
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
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <AddEditRow
        title="Add New Record"
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <AddEditRow
        title="Edit Record"
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
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
      <RowActions table={table} row={row} hoveredRow={hoveredRow} handleCancel={handleCancel} />
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

  return (
    <>
      <PageSection>
        <PageHeader
          table={table}
          title="Event promo grid"
          subtitle="Manage events "
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
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={confirmCancel}
        eventIds={selectedEventIds}
      />
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
