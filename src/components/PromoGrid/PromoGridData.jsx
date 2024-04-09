import React, { useEffect, useState } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ToolbarAlertBanner
} from 'material-react-table';
import {
  addNewRowData,
  downloadBlankExcel,
  downloadDataExcel,
  getData,
  uploadDataExcel
} from '../../api/promoGridApi';

import { handleChangeValidate, handleValidate, parseValues } from '../../utils/commonMethods';
import AddEditRow from '../Common/AddEditRow';
import PromoGridColumns from './PromoGridColumns';
import RowActions from '../Common/RowActions';
import PageHeader from '../Common/PageHeader';
import PageSection from '../Common/PageSection';
import InfoSnackBar from '../Common/InfoSnackBar';
const PromoGridData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [validationErrors, setValidationErrors] = useState({});

  const fetchData = async () => {
    try {
      const response = await getData(pagination.pageIndex, pagination.pageSize);
      setData(response.results);
      setRowCount(response.count);
      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  //Validate Values
  const validateValues = (values) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      setIsSaving(false);
      return true;
    } else {
      return false;
    }
  };

  //CREATE action
  const handleCreate = async ({ values, table }) => {
    setIsSaving(true);
    const parsedValues = parseValues(values);
    validateValues(values);

    try {
      await addNewRowData(parsedValues);
      table.setCreatingRow(null);
      setIsLoading(true);
      setIsRefetching(true);
      await fetchData();
      setIsSaving(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'New data added successfully !!!',
        severity: 'success'
      });
    } catch (error) {
      const errors = error.response.data;
      let message = 'Error occured while adding the data.\n';
      Object.keys(errors).forEach((key) => {
        if (key) {
          message += `${key}:${errors[key]}\n`;
        }
      });
      setIsSaving(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: message,
        severity: 'error'
      });
    }
  };

  const handleUpdate = () => {};

  const handleChange = (event, validationType, accessorKey) => {
    let errorMessage = handleChangeValidate(event, validationType);
    setValidationErrors({
      ...validationErrors,
      [accessorKey]: errorMessage
    });
  };

  const validateData = (data) => {
    return {
      unique_event_id: handleValidate('stringValidation', 'required', data.unique_event_id),
      golden_customer_id: handleValidate('integerValidation', 'required', data.golden_customer_id),
      event_type: handleValidate('stringValidation', 'required', data.event_type),
      event_subtype: handleValidate('stringValidation', 'required', data.event_subtype),
      event_sales_channel: handleValidate('stringValidation', 'required', data.event_sales_channel),
      item_type: handleValidate('stringValidation', 'required', data.item_type),
      bu: handleValidate('stringValidation', 'required', data.bu),
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
      await downloadDataExcel();
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
        if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          setIsDataLoading(true);
          const formData = new FormData();
          formData.append('file', file);
          await uploadDataExcel(formData);
          setIsDataLoading(false);
          setIsSnackOpen(true);
          setSnackBar({
            message: 'Excel file data uploaded successfully !!!',
            severity: 'success'
          });
          setIsLoading(true);
          setIsRefetching(true);
          fetchData();
          event.target.value = null;
        } else {
          alert('Please select an excel file');
        }
      } else {
        alert('Please select a file');
      }
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured while updating the data ! Please try again !!!',
        severity: 'error'
      });
      event.target.value = null;
      setIsDataLoading(false);
    }
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const table = useMaterialReactTable({
    columns: PromoGridColumns({ validationErrors, handleChange }),
    data,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    muiTableContainerProps: { sx: { minHeight: '510px', maxHeight: '510px' } },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      })
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
    enableEditing: true,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    manualPagination: true,
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
    renderRowActions: ({ row, table }) => <RowActions table={table} row={row} />,
    state: {
      isLoading: isLoading,
      isSaving: isSaving,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      pagination
    }
  });

  return (
    <>
      <PageSection>
        <PageHeader
          table={table}
          title="Event Promo Grid"
          subtitle="See information about events"
          handleDataDownloadExcel={handleDataDownloadExcel}
          handleDownloadBlankExcel={handleDownloadBlankExcel}
          handleUploadDataExcel={handleUploadDataExcel}
          isDataLoading={isDataLoading}
        />
        <MRT_ToolbarAlertBanner table={table} />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </PageSection>
      {isSnackOpen && snackBar && (
        <InfoSnackBar
          isOpen={isSnackOpen}
          message={snackBar.message}
          severity={snackBar.severity}
          onClose={handleSnackbar}
        />
      )}
    </>
  );
};

export default PromoGridData;
