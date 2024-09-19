import React, { useState, useEffect } from 'react';
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
import { cpfDecisions, cpfSkuForecast } from '../../api/cpfForecastApi';
import NewForecastColumns from './NewForecastColumns';
import ConfirmationDialog from './ConfirmationDialog';
import PreviousForecastColumns from './PreviousForecastColumns';

import StatusBadges from './StatusBadges';
import CellCheckboxComponent from './CellCheckboxComponent';

const SkuItem = ({
  sku, // The SKU identifier for the product
  prod_name, // The name of the product
  isExpanded, // Boolean indicating if the accordion is expanded
  selectedUnit, // The unit selected for the forecast
  editedValues = {}, // Object containing edited values for the forecast
  setEditedValues, // Function to update the edited values
  index, // Index of the current SKU item in the list
  selectedFilters, // Object containing the selected filters
  onAccordionChange, // Function to handle accordion state change
  cpfEnabled, // Boolean indicating if CPF  is enabled
  pendingCount, // Number of pending forecasts
  missingCount, // Number of missing forecasts
  warningCount // Number of warning forecasts
}) => {
  const [data, setData] = useState([]);
  const [lastSelectedSku, setLastSelectedSku] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [csFactor, setCsFactor] = useState();
  const [itFactor, setItFactor] = useState();
  const [rowSelection, setRowSelection] = useState({});
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

  // Fetch data based on SKU
  const fetchData = async (sku) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const requestbody = {
        sku: sku,
        customerId: selectedFilters.customerId[0],
        eventType: selectedFilters.eventType,
        eventSubtype: selectedFilters.eventSubtype,
        status: selectedFilters.status
      };
      const response = await cpfSkuForecast(requestbody);
      setIsLoading(false);
      setData(response.forecast);
      setCsFactor(response.cs_factor);
      setItFactor(response.it_factor);
      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  // Handle accordion click
  const handleAccordionClick = (sku) => {
    if (sku === lastSelectedSku) {
      return;
    }
    setLastSelectedSku(sku);
    fetchData(sku);
  };

  // Effect to initialize row selection based on data
  useEffect(() => {
    const initialRowSelection = {};
    if (data) {
      data?.forEach((row, index) => {
        if (row.approved) {
          initialRowSelection[index] = true;
        }
        setIsLoading(false);
      });
    }
    setRowSelection(initialRowSelection);
  }, [data]);

  // Handle accordion change
  const handleAccordionChange = () => {
    onAccordionChange(isExpanded ? -1 : index);
  };

  // Handle save button click
  const handleSave = (event) => {
    event.stopPropagation();
    if (cpfEnabled) {
      setOpenSubmitDialog(true);
    }
  };

  // Handle submit action
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
      await fetchData(sku);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occurred ! Please submit again !!!',
        severity: 'error'
      });
      setIsSaving(false);
    }
  };

  // Convert units based on selected unit type
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

  // Handle edit units
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

  // Effect to update row selection based on edited values
  useEffect(() => {
    if (Object.keys(editedValues).length === 0) {
      const updatedRowSelection = { ...rowSelection };
      data?.forEach((row, index) => {
        if (row.approved) {
          updatedRowSelection[index] = true;
        } else {
          updatedRowSelection[index] = false;
        }
      });
      setRowSelection(updatedRowSelection);
    }
  }, [editedValues]);

  // Configuration for previous forecast table
  const previousForecastTable = useMaterialReactTable({
    columns: PreviousForecastColumns({
      selectedUnit,
      convertedUnits
    }),
    data: data || [],
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
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data !!!'
        }
      : undefined,
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
      isLoading: isLoading,
      isSaving: isSaving,
      showAlertBanner: isError,
      showProgressBars: isRefetching
    }
  });

  // Define the function to handle checkbox change
  const handleCheckboxChange = (event, row, setRowSelection) => {
    const isChecked = event.target.checked;
    // Update the row selection state based on the checkbox state
    setRowSelection((prevSelection) => ({
      ...prevSelection,
      [row.id]: isChecked
    }));
  };

  // Configuration for new forecast table
  const NewForecastTable = useMaterialReactTable({
    columns: NewForecastColumns({
      selectedUnit,
      convertedUnits,
      handleEditUnits,
      editedValues,
      cpfEnabled
    }),
    data: data || [],
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
        verticalAlign: 'middle',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark
        }
      })
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Network Error. Could not fetch the data.'
        }
      : undefined,
    enableEditing: cpfEnabled,
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
        border: 'none',
        muiTableBodyCellProps: {
          sx: {
            pointerEvents: cpfEnabled ? 'auto' : 'none', // disabling pointer events if cpfEnabled is false
            opacity: cpfEnabled ? 1 : 0.5
          }
        },
        muiTableHeadCellProps: {
          sx: (theme) => ({
            pointerEvents: cpfEnabled ? 'auto' : 'none', // disabling pointer events if cpfEnabled is false for column header
            opacity: cpfEnabled ? 1 : 0.5,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText
          })
        },
        Cell: ({ row }) => (
          <CellCheckboxComponent
            row={row}
            rowSelection={rowSelection}
            handleCheckboxChange={handleCheckboxChange}
            setRowSelection={setRowSelection}
          />
        )
      }
    },
    state: {
      rowSelection,
      isLoading: isLoading,
      isSaving: isSaving,
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
        expanded={isExpanded}
        onChange={handleAccordionChange}>
        <AccordionSummary
          sx={{ padding: 0 }}
          onClick={() => handleAccordionClick(sku)}
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
              <StatusBadges
                pendingCount={pendingCount}
                warningCount={warningCount}
                missingCount={missingCount}
              />
            </div>
            <Button
              variant="outlined"
              className="grow-0"
              color="primary"
              size="small"
              startIcon={<CheckIcon />}
              onClick={handleSave}
              disabled={!cpfEnabled}>
              {isSaving ? 'Saving...' : 'Save Decision'}
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item md={8}>
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

            <Grid item md={4}>
              <Typography variant="h5" component="h4" className="h-6">
                Last Submitted Forecast
              </Typography>

              <div className="mt-2">
                <MRT_ToolbarAlertBanner table={previousForecastTable} className="info-message" />
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
        contentHeading="Please confirm the selection of a portion of available event forecast weeks. Unchecked values will remain as previously submitted."
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
