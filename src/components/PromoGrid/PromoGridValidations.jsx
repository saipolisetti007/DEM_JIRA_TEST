import React, { useEffect, useState } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_ToolbarAlertBanner
} from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';
import PromoGridValidationColumns from './PromoGridValidationColumns';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import { handleChangeValidate } from '../../utils/commonMethods';
import { useLocation, useNavigate } from 'react-router-dom';
import { promoGridSubmit, promoGridValidate } from '../../api/promoGridApi';
import InfoSnackBar from '../Common/InfoSnackBar';
import BreadcrumbNavigation from '../Common/BreadcrumbNavigation';
import ValidationPageDialog from '../Common/ValidationPageDialog'; // Make sure the path is correct
import DialogComponent from '../Common/DialogComponent';

const PromoGridValidationTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { responseData } = location.state || {};
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [validationWarnings, setValidationWarnings] = useState({});
  const [updatedData, setUpdatedData] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [selectedCustomer, setSelectedCustomer] = useState();
  // State for the dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [navigateTarget, setNavigateTarget] = useState(null);

  const fetchData = async () => {
    try {
      const data = responseData || {};
      updateData(data);
      setIsLoading(false);
      setIsRefetching(false);
      setUpdatedData(data);
      setSelectedCustomer(data.rows[0]?.golden_customer_id);
    } catch (error) {
      setIsLoading(true);
      setIsError(true);
    }
  };

  const updateData = (data) => {
    setTableData(data.rows || []);
    const errors = data.rows.map((row) => row.validations || {});
    setValidationErrors(errors);
  };

  useEffect(() => {
    fetchData();
  }, [responseData]);

  const allErrorsNull = Object.values(validationErrors).every((error) => {
    return Object.values(error).every((value) => value === null);
  });

  const handleInputChange = (newValue, rowIndex, accessorKey, helperMessage, validationType) => {
    setSubmitDisabled(true);
    let errorMessage;
    if (helperMessage) {
      errorMessage = helperMessage;
    } else {
      errorMessage = handleChangeValidate(newValue, validationType);
    }
    const updatedErrors = [...validationErrors];

    updatedErrors[rowIndex][accessorKey] = errorMessage !== undefined ? errorMessage : null;

    const updatedValues = [...updatedData.rows];
    // Check if all error messages are the same or null
    const errorMessages = Object.values(updatedErrors[rowIndex]);
    const uniqueErrors = new Set(errorMessages.filter((error) => error !== null));
    const allErrorsSameOrNull = uniqueErrors.size <= 1;
    if (allErrorsSameOrNull) {
      for (let key in updatedErrors[rowIndex]) {
        updatedErrors[rowIndex][key] = null;
      }
    }

    if (accessorKey === 'event_type' && updatedErrors[rowIndex]?.event_subtype) {
      updatedErrors[rowIndex].event_subtype = null;
    }
    if (accessorKey === 'event_subtype' && updatedErrors[rowIndex]?.event_type) {
      updatedErrors[rowIndex].event_type = null;
    }
    if (accessorKey === 'event_type') {
      updatedErrors[rowIndex].event_subtype = 'Required';
    }

    setValidationErrors(updatedErrors);
    updatedValues[rowIndex][accessorKey] = newValue;
    return errorMessage;
  };

  const handleValidate = async () => {
    setIsDataLoading(true);
    if (!allErrorsNull) return;
    try {
      const updatedRows = updatedData.rows.map((row) => {
        // eslint-disable-next-line no-unused-vars
        const { validations, validation_warning, ...rest } = row;
        return rest;
      });
      const updatedState = { ...updatedData, rows: updatedRows };
      const response = await promoGridValidate(updatedState);
      setIsDataLoading(false);
      if (response.rows) {
        // Assuming response contains updated rows with validation warnings
        const warnings = response.rows.map((row) => row.validation_warning || {});
        const hasWarnings = warnings.some((warning) => Object.keys(warning).length > 0);

        if (hasWarnings) {
          setUpdatedData(response);
          setValidationErrors(warnings);
          setValidationWarnings(warnings);
          setWarningDialogOpen(true);
        } else {
          setSubmitDisabled(false);
          setIsSnackOpen(true);
          setSnackBar({
            message: 'Validation successful. You can proceed to submit.',
            severity: 'success'
          });
        }
      } else {
        setSubmitDisabled(false);
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Validation Successful, please submit the data !!!',
          severity: 'success'
        });
      }
    } catch (error) {
      updateData(error.response.data);
      setIsDataLoading(false);
      setSubmitDisabled(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Please check the validations !!!',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async () => {
    setWarningDialogOpen(false);
    try {
      const promoHeader = {
        promo_header: responseData.promo_header
      };
      await promoGridSubmit(promoHeader);
      navigate('/promo-grid', {
        state: {
          messageData: 'Excel file data uploaded successfully !!!',
          selectedCustomer: selectedCustomer
        }
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred while updating the data ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setWarningDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    setDialogOpen(false);
    navigate(navigateTarget);
  };

  const handleNavigate = (target) => {
    setNavigateTarget(target);
    setDialogOpen(true);
  };

  const handleReturnToPromoGrid = () => {
    navigate('/promo-grid');
  };

  const table = useMaterialReactTable({
    data: tableData,
    columns: PromoGridValidationColumns({
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
      <PageSection>
        <BreadcrumbNavigation onNavigate={handleNavigate} />
        <Box className="p-2">
          <div className="flex items-center justify-between">
            <DefaultPageHeader
              title="Promo Grid Validations"
              subtitle={
                allErrorsNull ? (
                  <Typography className="text-green-700">
                    Validate the data and proceed to submit
                  </Typography>
                ) : (
                  <Typography color="error">Fix and Validate errors before submitting</Typography>
                )
              }
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outlined"
                color="success"
                size="medium"
                className="rounded-full ml-4"
                onClick={handleValidate}
                disabled={!allErrorsNull}>
                {isDataLoading ? 'Validating...' : 'Validate'}
              </Button>

              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                disabled={submitDisabled}>
                Submit
              </Button>
            </div>
          </div>
        </Box>
        <MRT_ToolbarAlertBanner table={table} />
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </PageSection>
      {isSnackOpen && snackBar && (
        <InfoSnackBar
          isOpen={isSnackOpen}
          message={snackBar.message}
          severity={snackBar.severity}
          onClose={() => setIsSnackOpen(false)}
        />
      )}
      <ValidationPageDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        onReturnToPromoGrid={handleReturnToPromoGrid}
      />
      <DialogComponent
        open={warningDialogOpen}
        title="Confirm submission"
        dialogHeading="There are warnings in the form submission"
        dialogContent="Do you want to proceed?"
        cancelText="Return to PromoGrid"
        confirmText="Proceed to Submit"
        handleConfirm={handleSubmit}
        handleClose={handleDialogClose}
      />
    </>
  );
};

export default PromoGridValidationTable;
