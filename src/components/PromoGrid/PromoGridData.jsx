import React, { useEffect, useState } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ToolbarAlertBanner
} from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import {
  downloadBlankExcel,
  downloadDataExcel,
  getData,
  uploadDataExcel
} from '../../api/promoGridApi';
import { setPromoData } from './promoGridSlice';

import { handleChangeValidate } from '../../utils/commonMethods';
import AddEditRow from '../Common/AddEditRow';
import PromoGridColumns from './PromoGridColumns';
import RowActions from '../Common/RowActions';
import PageHeader from '../Common/PageHeader';
import PageSection from '../Common/PageSection';
import InfoSnackBar from '../Common/InfoSnackBar';
const PromoGridData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [isSaving] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const tableData = useSelector((state) => state.promoData.promoData);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await getData(pagination.pageIndex, pagination.pageSize);
      dispatch(setPromoData(response.results));
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
  }, [dispatch, pagination]);

  //CREATE action
  const handleCreate = async () => {
    //console.log(values, table);
    // setIsSaving(true);
    // const newValidationErrors = validateData(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   setIsSaving(false);
    //   return;
    // }
    // setValidationErrors({});
    // // Add new row data
    // await dispatch(addNewRowData(values));
    // table.setCreatingRow(null);
    // fetchData();
    // setIsSaving(false);
  };

  //UPDATE action
  const handleUpdate = async () => {
    //console.log(values, table, row);
    // const newValidationErrors = validateData(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   setIsSaving(false);
    //   return;
    // }
    // setValidationErrors({});
    // await dispatch(updateRowData(row.original.id, values));
    // table.setEditingRow(null);
    // fetchData();
    // setIsSaving(false);
  };

  //DELETE action
  // const handleDelete = async (row) => {
  //   console.log(row);
  //   // if (window.confirm('Are you sure you want to delete this data?')) {
  //   //   setIsSaving(true);
  //   //   dispatch(deleteRowData(row.original.id));
  //   //   setIsSaving(false);
  //   // }
  //   // fetchData();
  // };
  const handleChange = (event, validationType, accessorKey) => {
    let errorMessage = handleChangeValidate(event, validationType);
    setValidationErrors({
      ...validationErrors,
      [accessorKey]: errorMessage
    });
  };

  // const validateData = (data) => {
  //   return {
  //     goldenCustomerID: handleValidate('integerValidation', 'required', data.goldenCustomerID),
  //     eventType: handleValidate('stringValidation', 'required', data.eventType),
  //     eventSubtype: handleValidate('stringValidation', 'required', data.eventSubtype),
  //     eventSalesChannel: handleValidate('stringValidation', 'required', data.itemType),
  //     itemType: handleValidate('stringValidation', 'required', data.itemType),
  //     bu: handleValidate('stringValidation', 'required', data.bu),
  //     idType: handleValidate('stringValidation', 'required', data.idType),
  //     countryCode: handleValidate('stringValidation', 'required', data.countryCode),
  //     productID: handleValidate('integerValidation', 'required', data.productID),
  //     customerItemNumber: handleValidate('integerValidation', 'required', data.customerItemNumber)
  //   };
  // };

  const handleDownloadBlankExcel = async () => {
    try {
      await downloadBlankExcel();
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Excel Template Downloaded Successfully',
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error Occured while downloading ! Please Try Agian !!!',
        severity: 'error'
      });
    }
  };

  const handleDataDownloadExcel = async () => {
    try {
      await downloadDataExcel();
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Excel Data Downlaoded Successfully',
        severity: 'success'
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error Occured while downloading ! Please Try Agian !!!',
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
            message: 'Excel File Data Uploaded Successfully',
            severity: 'success'
          });
          setIsLoading(true);
          setIsRefetching(true);
          fetchData();
          event.target.value = null;
        } else {
          alert('Please select an Excel file');
        }
      } else {
        alert('Please select a file');
      }
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error Occured while Updating the Data ! Please Try Agian !!!',
        severity: 'error'
      });
      setIsDataLoading(false);
    }
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const table = useMaterialReactTable({
    columns: PromoGridColumns({ validationErrors, handleChange }),
    data: tableData,
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
          children: 'Network Error. Could not fetch data.'
        }
      : undefined,
    enableEditing: true,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    manualPagination: true,
    getRowId: (row) => row.id,
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
          subtitle="See information about Events"
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
