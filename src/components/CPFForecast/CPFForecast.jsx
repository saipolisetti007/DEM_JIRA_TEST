import React from 'react';
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
const CPFForecast = () => {
  const data = [
    {
      product: 'Product 1 '
    },
    {
      product: 'Product 2 '
    },
    {
      product: 'Product 3 '
    },
    {
      product: 'Product 4 '
    },
    {
      product: 'Product 5 '
    }
  ];

  const table = useMaterialReactTable({
    columns: CPFTableColumns(),
    data,
    muiTableContainerProps: { sx: { minHeight: '510px', maxHeight: '510px' } },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      })
    },
    enableEditing: false,
    enableRowActions: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    manualPagination: true,
    renderRowActions: ({ row, table }) => <CPFRowActions table={table} row={row} />,
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        right: ['mrt-row-actions']
      }
    }
  });
  return (
    <PageSection>
      <Box className="p-2">
        <div className="flex items-center justify-between gap-8">
          <DefaultPageHeader title="CPF Forecast" subtitle="Pending Approvals" />
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </Box>
      <MRT_ToolbarAlertBanner table={table} />
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </PageSection>
  );
};

export default CPFForecast;
