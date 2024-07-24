import React, { useState, useMemo, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography
} from '@mui/material';
import {
  MRT_TableContainer,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable
} from 'material-react-table';
import { ArrowDropDown } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import InfoSnackBar from '../Common/InfoSnackBar';
import { cpfDecisions } from '../../api/cpfForecastApi';
import NewForecastColumns from './NewForecastColumns';
import ConfirmationDialog from './ConfirmationDialog';

const SkuItem = ({
  sku,
  prod_name,
  data,
  isExanped,
  isLoading,
  setIsLoading,
  isRefetching,
  setIsRefetching,
  isError,
  csFactor,
  itFactor,
  selectedUnit,
  editedValues = {},
  setEditedValues,
  index,
  onSubmit,
  onAccordionChange
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

  useEffect(() => {
    const initialRowSelection = {};
    if (data) {
      data.forEach((row, index) => {
        if (row.approved) {
          initialRowSelection[index] = true;
        }
        setIsLoading(false);
      });
    }
    setRowSelection(initialRowSelection);
  }, [data]);

  const hanldeAccordionChange = () => {
    onAccordionChange(isExanped ? -1 : index);
  };

  const handleSave = (event) => {
    event.stopPropagation();
    setOpenSubmitDialog(true);
  };

  const handleSubmit = async () => {
    setOpenSubmitDialog(false);
    try {
      const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

      const updatedRowData = data.map((row, index) => {
        const editedValue = editedValues[index];
        const hasEdits = editedValue !== undefined;
        if (selectedRowIds.includes(index.toString())) {
          if (hasEdits) {
            return { ...row, ...editedValue, approved: true };
          } else {
            const convertedRow = { ...row };
            if (row.editedUnits !== undefined) {
              convertedRow.editedUnits = convertedUnits(row.editedUnits, selectedUnit);
            }
            return { ...convertedRow, approved: true };
          }
        }
        return { ...row, approved: false };
      });

      const updatedTableData = updatedRowData.map((row) => {
        // eslint-disable-next-line no-unused-vars
        const { unit, unit_diff, prevUnits, percentChange, finalunits, ...rest } = row;
        return rest;
      });

      const updatedData = { sku: sku, units: selectedUnit, forecast: updatedTableData };
      setIsSaving(true);
      await cpfDecisions(updatedData);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Data Submitted successfully !!!',
        severity: 'success'
      });
      setEditedValues({});
      setIsRefetching(true);
      setIsSaving(false);
      setTimeout(() => {
        if (onSubmit) {
          onSubmit();
        }
      }, 1000);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured ! Please submit again !!!',
        severity: 'error'
      });
      setIsSaving(false);
    }
  };

  const convertedUnits = (value, unit) => {
    let convertedValue;
    switch (unit) {
      case 'cs':
        convertedValue = Math.round(value / csFactor);
        break;
      case 'it':
        convertedValue = Math.round(value / itFactor);
        break;
      case 'msu':
        convertedValue = (value / 1000).toFixed(2).toString();
        break;
      default:
        convertedValue = Math.round(value);
    }
    return convertedValue;
  };

  const handleEditUnits = (rowIndex, columnId, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [columnId]: value
      }
    }));
    const initialRowSelection = { ...rowSelection, [rowIndex]: true };
    setRowSelection(initialRowSelection);
  };

  useEffect(() => {
    if (Object.keys(editedValues).length === 0) {
      const updatedRowSelection = { ...rowSelection };
      data.forEach((row, index) => {
        if (row.approved) {
          updatedRowSelection[index] = true;
        } else {
          updatedRowSelection[index] = false;
        }
      });
      setRowSelection(updatedRowSelection);
    }
  }, [editedValues]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'week',
        header: 'Weeks'
      },
      {
        accessorKey: 'prevUnits',
        header: 'Units',
        Cell: ({ row, column }) => convertedUnits(row.original[column.id], selectedUnit)
      }
    ],
    [convertedUnits]
  );

  const previousForecastTable = useMaterialReactTable({
    columns,
    data,
    muiTableProps: {
      sx: {
        borderCollapse: 'collapse',
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#E0E0E0',
        textTransform: 'initial',
        verticalAlign: 'middle'
      }
    },
    enableEditing: false,
    enableRowActions: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    initialState: {
      density: 'compact'
    },
    defaultColumn: {
      size: 150
    },
    state: {
      rowSelection
    }
  });

  const NewForecastTable = useMaterialReactTable({
    columns: NewForecastColumns({
      selectedUnit,
      convertedUnits,
      handleEditUnits,
      editedValues
    }),
    data,
    muiTableProps: {
      sx: {
        borderCollapse: 'collapse',
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: '0.5px solid rgba(0, 0, 0, 0.23)'
      }
    },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        textTransform: 'initial',
        verticalAlign: 'middle'
      })
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
    enableEditing: true,
    editDisplayMode: 'table',
    enableRowActions: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowSelection: (row) => row.original.active,
    onRowSelectionChange: setRowSelection,
    initialState: {
      density: 'compact'
    },
    defaultColumn: {
      size: 120
    },
    displayColumnDefOptions: {
      'mrt-row-select': {
        header: '',
        size: 20,
        border: 'none'
      }
    },
    state: {
      rowSelection,
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching
    }
  });

  return (
    <>
      <Accordion
        data-testid={`accordion-item-${index}`}
        disableGutters
        elevation={0}
        expanded={isExanped}
        onChange={hanldeAccordionChange}>
        <AccordionSummary
          sx={{ padding: 0 }}
          className="flex-row-reverse"
          expandIcon={<ArrowDropDown sx={{ fontSize: '2rem' }} />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex gap-4">
              <Typography variant="h3" color="primary" className="grow-0 min-w-64">
                SKU : {sku}{' '}
                <Typography variant="span" sx={{ fontWeight: 400 }}>
                  ({prod_name})
                </Typography>
              </Typography>
            </div>
            <Button
              variant="outlined"
              className="grow-0"
              color="primary"
              size="small"
              startIcon={<CheckIcon />}
              onClick={handleSave}>
              {isSaving ? 'Saving...' : 'Save Decision'}
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item md={7}>
              <div className="flex w-full justify-between items-center h-6">
                <Typography variant="h5" component="h4">
                  New Forecast
                </Typography>
              </div>

              <div className="mt-2" data-testid="NewForecastTable">
                <MRT_ToolbarAlertBanner table={NewForecastTable} className="info-message" />
                <MRT_TableContainer table={NewForecastTable} />
              </div>
            </Grid>

            <Grid item md={5}>
              <Typography variant="h5" component="h4" className="h-6">
                Previous Forecast
              </Typography>

              <div className="mt-2">
                <MRT_ToolbarAlertBanner table={NewForecastTable} className="info-message" />
                <MRT_TableContainer table={previousForecastTable} />
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <ConfirmationDialog
        open={openSubmitDialog}
        onClose={() => setOpenSubmitDialog(false)}
        onConfirm={handleSubmit}
        title="Are you sure.. ? Save decision?"
        contentHeading="Please check the Forecast, Only Checked values are to be submitted, unchecked values
              will be rejected."
      />

      {isSnackOpen && snackBar && (
        <InfoSnackBar
          isOpen={isSnackOpen}
          message={snackBar.message}
          severity={snackBar.severity}
          onClose={() => setIsSnackOpen(false)}
        />
      )}
    </>
  );
};

export default SkuItem;
