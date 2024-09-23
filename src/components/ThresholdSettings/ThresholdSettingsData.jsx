import React, { useEffect, useState } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import {
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import {
  cpfThresholdAdd,
  cpfThresholdDelete,
  cpfThresholdEdit,
  cpfThresholdList,
  fetchThresholdFilters
} from '../../api/cpfForecastApi';
import ThresholdSettingsColumns from './ThresholdSettingsColumns';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RowActions from '../Common/RowActions';
import AddEditFormDialog from '../Common/AddEditFormDialog';
import AddRuleForm from './AddRuleForm';
import { FormProvider, useForm } from 'react-hook-form';
import InfoSnackBar from '../Common/InfoSnackBar';
import DialogComponent from '../Common/DialogComponent';
import { useSelector } from 'react-redux';
import PageLoader from '../Common/PageLoader';

const ThresholdSettingsData = () => {
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isMode, setIsMode] = useState('add');
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { customerId } = useSelector((state) => state.userProfileData); // Get customerId from Redux store
  const methods = useForm({ mode: 'onChange', defaultValues: rowData || {} }); // Initialize react-hook-form
  const { handleSubmit, control, formState } = methods; // Destructure methods from useForm
  const [isPageLoading, setIsPageLoading] = useState(false);
  // State to manage pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  // State to manage filters
  const [filters, setFilters] = useState({
    subsectors: [],
    rawData: {}
  });

  // Fetch data and filters when customerId changes
  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  // Reset form when mode or rowData changes
  useEffect(() => {
    if (isMode === 'edit' && rowData) {
      methods.reset(rowData);
    } else if (isMode === 'add') {
      methods.reset({});
    }
  }, [isMode, rowData, methods]);

  // Fetch threshold data
  const fetchData = async (selectedCustomer) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await cpfThresholdList(selectedCustomer);
      setData(response.results);
      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  // Fetch filters data
  const fetchFilters = async () => {
    try {
      const data = await fetchThresholdFilters();
      setFilters({
        subsectors: data || [],
        rawData: data || {}
      });
    } catch (error) {
      console.error('Failed to load filters:', error);
    }
  };

  //Add Rule functions
  const handleAddRule = async () => {
    setIsMode('add');
    methods.reset({});
    setErrorMessage('');
    setOpenDialog(true);
    setIsPageLoading(true);
    await fetchFilters();
    setIsPageLoading(false);
  };

  //Save Rule
  const handleSave = async () => {
    handleSubmit(onSubmit)();
  };

  //Submit Rule
  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      data.customer = customerId;
      await cpfThresholdAdd(data);
      setIsSaving(false);
      setOpenDialog(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'New threshold rule has been added successfully',
        severity: 'success'
      });
      await fetchData(customerId);
    } catch (error) {
      setIsSaving(false);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Failed to add threshold rule',
          severity: 'error'
        });
      }
    }
  };

  //Edit Rule functions

  const handleEditRule = async (row) => {
    setIsMode('edit');
    setOpenDialog(true);
    setErrorMessage('');
    setRowData(row.original);
    setIsPageLoading(true);
    await fetchFilters();
    setIsPageLoading(false);
  };

  //Edit Save Rule
  const handleEditSave = async () => {
    handleSubmit(onEditSubmit)();
  };

  //Edit Submit Rule
  const onEditSubmit = async (data) => {
    setIsSaving(true);
    try {
      await cpfThresholdEdit(rowData.id, data);
      setIsSaving(false);
      setOpenDialog(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Threshold rule has been changed successfully ',
        severity: 'success'
      });
      await fetchData(customerId);
    } catch (error) {
      setIsSaving(false);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Failed to change the threshold rule',
          severity: 'error'
        });
      }
    }
  };

  //Cancel Rule
  const handleCancelRule = (row) => {
    setOpenConfirmDialog(true);
    setRowData(row.original);
  };

  //Delete Rule
  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await cpfThresholdDelete(rowData.id);
      setIsSaving(false);
      setOpenConfirmDialog(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Threshold rule has been deleted successfully',
        severity: 'success'
      });
      await fetchData(customerId);
    } catch {
      setIsSaving(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Failed to delete threshold rule',
        severity: 'error'
      });
    }
  };
  //Close Dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenConfirmDialog(false);
  };
  //Close Snackbar
  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const ThresholdTable = useMaterialReactTable({
    columns: ThresholdSettingsColumns(),
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
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
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
    enablePagination: true,
    enableSorting: false,
    columnFilterDisplayMode: 'popover',
    enableFacetedValues: true,
    onPaginationChange: setPagination,
    initialState: {
      showColumnFilters: true,
      density: 'compact',
      columnPinning: {
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
    muiFilterTextFieldProps: {
      variant: 'outlined',
      size: 'small',
      className: 'column-filter'
    },
    renderRowActions: ({ row, table }) => (
      <RowActions
        table={table}
        row={row}
        hoveredRow={hoveredRow}
        handleEdit={handleEditRule}
        handleCancel={handleCancelRule}
        cancelTooltip="Delete"
        editTooltip="Edit"
      />
    ),
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
        <DefaultPageHeader title="Threshold Settings" subtitle="Manage CPF parameters" />
        <div className="flex justify-end items-baseline gap-2 mb-4">
          <Button
            variant="outlined"
            color="success"
            size="medium"
            className="rounded-full mb-2 float-end"
            startIcon={<AddCircleIcon />}
            onClick={handleAddRule}>
            Add New Threshold Rule
          </Button>
        </div>

        <div className="threshold-table">
          <MRT_ToolbarAlertBanner table={ThresholdTable} className="info-message" />
          <MRT_TableContainer table={ThresholdTable} />
          <MRT_TablePagination table={ThresholdTable} />
        </div>
      </PageSection>

      {isMode === 'add' ? (
        <AddEditFormDialog
          open={openDialog}
          title="Add New Threshold Rule"
          cancelText="Return to Settings"
          confirmText={isSaving ? 'Saving' : 'Save'}
          disabled={!formState.isValid}
          handleConfirm={handleSave}
          handleClose={handleDialogClose}>
          {isPageLoading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PageLoader />
            </div>
          )}
          <FormProvider {...methods}>
            <AddRuleForm control={control} filters={filters} errorMessage={errorMessage} />
          </FormProvider>
        </AddEditFormDialog>
      ) : (
        <AddEditFormDialog
          open={openDialog}
          title="Edit Threshold Rule"
          cancelText="Cancel"
          confirmText={isSaving ? 'Saving' : 'Save Changes'}
          disabled={!formState.isValid}
          handleConfirm={handleEditSave}
          handleClose={handleDialogClose}>
          {isPageLoading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PageLoader />
            </div>
          )}
          <FormProvider {...methods}>
            <AddRuleForm
              control={control}
              filters={filters}
              errorMessage={errorMessage}
              isEdit={true}
            />
          </FormProvider>
        </AddEditFormDialog>
      )}

      <DialogComponent
        open={openConfirmDialog}
        title="Delete Threshold Rule"
        dialogHeading="Are you sure? you want to delete the rule?"
        dialogContent="The record will be deleted immediately. You can't undo this action."
        cancelText="Return to Settings"
        confirmText={isSaving ? 'Deleting' : 'Delete Rule'}
        handleConfirm={handleDelete}
        handleClose={handleDialogClose}
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

export default ThresholdSettingsData;
