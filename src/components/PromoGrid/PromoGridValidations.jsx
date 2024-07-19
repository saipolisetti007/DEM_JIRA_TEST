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
  const [updatedData, setUpdatedData] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

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
        const { validations, ...rest } = row;
        return rest;
      });
      const updatedState = { ...updatedData, rows: updatedRows };
      await promoGridValidate(updatedState);
      setIsDataLoading(false);
      setSubmitDisabled(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Validation Succesfull, please submit the data !!!',
        severity: 'success'
      });
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
    try {
      const promoHeader = {
        promo_header: responseData.promo_header
      };
      await promoGridSubmit(promoHeader);
      navigate('/promo-grid', {
        state: { messageData: 'Excel file data uploaded successfully !!!' }
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured while updating the data ! Please try again !!!',
        severity: 'error'
      });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
      handleInputChange
    }),
    enableEditing: true,
    editDisplayMode: 'table',
    enableColumnActions: false,
    muiTableContainerProps: { sx: { minHeight: '400px' } },
    muiTableProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, 0.2)'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, 0.2)'
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
                !allErrorsNull ? (
                  <Typography color="error">Fix and Validate errors before submitting</Typography>
                ) : (
                  <Typography className="text-green-700">
                    Validate the data and proceed to submit
                  </Typography>
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
    </>
  );
};

export default PromoGridValidationTable;
