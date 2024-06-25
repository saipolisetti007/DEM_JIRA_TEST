import React, { useState, useMemo, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

const SkuItem = ({
  sku,
  data,
  isExanped,
  isLoading,
  setIsLoading,
  isRefetching,
  setIsRefetching,
  isError,
  index,
  onAccordionChange
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
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
    setOpen(true);
  };

  const handleSubmit = async () => {
    setOpen(false);
    try {
      const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

      const updatedRowData = data.map((row, index) => {
        if (selectedRowIds.includes(index.toString())) {
          return { ...row, approved: true };
        }
        return { ...row, approved: false };
      });

      const updatedTableData = updatedRowData.map((row) => {
        // eslint-disable-next-line no-unused-vars
        const { unit, ...rest } = row;
        return rest;
      });

      const updatedData = { sku: sku, forecast: updatedTableData };
      setIsSaving(true);
      await cpfDecisions(updatedData);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Data Submitted successfully !!!',
        severity: 'success'
      });
      setIsRefetching(true);
      setIsSaving(false);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Error occured ! Please submit again !!!',
        severity: 'error'
      });
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'week',
        header: 'Weeks'
      },
      {
        accessorKey: 'unit',
        header: 'Units'
      }
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
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
    enableEditing: false,
    enableRowActions: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    enableRowSelection: (row) => row.original.active,
    onRowSelectionChange: setRowSelection,
    initialState: {
      density: 'compact'
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
        className="border"
        disableGutters
        elevation={0}
        expanded={isExanped}
        onChange={hanldeAccordionChange}>
        <AccordionSummary
          className="flex-row-reverse"
          expandIcon={<ArrowDropDown sx={{ fontSize: '2rem' }} />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}>
          <div className="flex items-center justify-between w-full">
            <Typography variant="h6" as="h3" color="primary">
              SKU : {sku}
            </Typography>
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              className="rounded"
              onClick={handleSave}>
              {isSaving ? 'Saving...' : 'Save Decision'}
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="subtitle2" as="h4">
                New Forecast
              </Typography>
              <div className="mt-2">
                <MRT_ToolbarAlertBanner table={table} />
                <MRT_TableContainer table={table} />
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-decision"
        aria-describedby="alert-decision-confirmation">
        <DialogTitle id="alert-decision">{'Are you sure.. ? save decision? '}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-decision-confirmation">
            Please check the Forecast, Only Checked values are to be submitted, unchecked values
            will be rejected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" size="small" variant="contained" onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
