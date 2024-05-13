import React, { useEffect, useState } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import {
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import CPFTableColumns from './CPFTableColumns';
import CPFRowActions from './CPFRowActions';
import { cpfDecisionAction, cpfGetData } from '../../api/cpfForecastApi';
import InfoSnackBar from '../Common/InfoSnackBar';
const CPFForecast = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selections, setSelections] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

  const fetchData = async () => {
    try {
      const response = await cpfGetData();
      setData(response);
      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectionChange = (id, product_id, status) => {
    const existingIndex = selections.findIndex(
      (item) => item.id === id && item.product_id === product_id
    );
    if (status === null) {
      const updateSelections = selections.filter(
        (item) => !(item.id === id && item.product_id === product_id)
      );
      setSelections(updateSelections);
    } else if (existingIndex !== -1) {
      const updateSelections = [...selections];
      updateSelections[existingIndex].status = status;
      setSelections(updateSelections);
    } else {
      setSelections([...selections, { id, product_id, status }]);
    }
  };

  const handleSnackbar = () => {
    setIsSnackOpen(false);
    setSnackBar(null);
  };

  const handleSubmit = async () => {
    try {
      if (!Object.keys(selections).length) {
        setIsSnackOpen(true);
        setSnackBar({
          message: 'Please approve /reject atleast one product ',
          severity: 'error'
        });
        return;
      }
      await cpfDecisionAction(selections);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Data Submitted successfully !!!',
        severity: 'success'
      });
      setIsLoading(true);
      setIsRefetching(true);
      fetchData();
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured ! Please submit again !!!',
        severity: 'error'
      });
    }
  };

  const table = useMaterialReactTable({
    columns: CPFTableColumns(),
    data,
    muiTableContainerProps: { sx: { minHeight: '440px', maxHeight: '440px' } },
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
    enableEditing: false,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    renderRowActions: ({ row }) => <CPFRowActions row={row} onChange={handleSelectionChange} />,
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        right: ['mrt-row-actions']
      }
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
        <Box className="p-2">
          <div className="flex items-center justify-between gap-8">
            <DefaultPageHeader title="CPF Forecast" subtitle="Pending Approvals" />
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
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
          onClose={handleSnackbar}
        />
      )}
    </>
  );
};

export default CPFForecast;
