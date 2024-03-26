import React, { useMemo, useState, useEffect } from 'react';
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_EditActionButtons
} from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { getData, addNewRowData, updateRowData, deleteRowData } from '../../api/storeApi';
import { getBrands, getCategories, getSubsectors } from '../../api/api';
import { setStoreData } from './storeDcSlice';
import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import BlankExcelDownload from '../Common/BlankExcelDownload';
import UploadExcelData from '../Common/UploadExcelData';
import ExcelWithDataDownload from '../Common/ExcelWithDataDownload';

const StoreToDc = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const tableData = useSelector((state) => state.storeData.storeData);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subsectors, setSubsectors] = useState([]);

  const currentDate = moment().format('MM/DD/YYYY');
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getData();
    dispatch(setStoreData(response));
    const brandData = await getBrands();
    setBrands(brandData);
    const categoryData = await getCategories();
    setCategories(categoryData);
    const subSectorData = await getSubsectors();
    setSubsectors(subSectorData);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //CREATE action
  const handleCreate = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log('error', newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    console.log('values:', values);

    const newValues = {
      ...values,
      createdBy: 'admin',
      lastUpdatedBy: 'admin',
      createdDate: currentDate,
      lastUpdatedDate: currentDate
    };
    console.log('new values:', newValues);

    // Add new row data
    await dispatch(addNewRowData(newValues));
    table.setCreatingRow(null); //exit creating mode
    fetchData(); // Reload data after editing
  };

  //UPDATE action
  const handleUpdate = async ({ values, table, row }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // Set default values
    const newValues = {
      ...values
    };
    if (JSON.stringify(newValues) !== JSON.stringify(row.original)) {
      newValues.lastUpdatedDate = currentDate;
    }
    console.log('edit values:', values);
    await dispatch(updateRowData(row.original.id, newValues));
    table.setEditingRow(null); //exit editing mode
    fetchData(); // Reload data after editing
  };

  //DELETE action
  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteRowData(row.original.id));
    }
    fetchData(); // Reload data after deleting
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 40,
        Edit: () => null
      },
      {
        accessorKey: 'customerIdentifier',
        header: 'Customer Identifier',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.customerIdentifier,
          helperText: validationErrors?.customerIdentifier,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                customerIdentifier: 'Must be a number'
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                customerIdentifier: undefined
              });
            }
          }
        }
      },
      {
        accessorKey: 'dateFrom',
        header: 'Date From',
        Edit: ({ column, row }) => {
          const initialValue = row.original.dateFrom
            ? moment(row.original.dateFrom, 'MM/DD/YYYY')
            : null;
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                onChange={(newValue) => {
                  row._valuesCache[column.id] = moment(newValue).format('MM/DD/YYYY');
                }}
                label={column.columnDef.header}
                value={initialValue}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          );
        }
      },
      {
        accessorKey: 'dateTo',
        header: 'Date To',
        Edit: ({ column, row }) => {
          const initialValue = row.original.dateTo
            ? moment(row.original.dateTo, 'MM/DD/YYYY')
            : null;
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                onChange={(newValue) => {
                  row._valuesCache[column.id] = moment(newValue).format('MM/DD/YYYY');
                }}
                label={column.columnDef.header}
                value={initialValue}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          );
        }
      },
      {
        accessorKey: 'dcID',
        header: 'DC Id',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.dcID,
          helperText: validationErrors?.dcID,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                dcID: 'Must be a number'
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                dcID: undefined
              });
            }
          }
        }
      },
      {
        accessorKey: 'storeID',
        header: 'Store Id',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.storeID,
          helperText: validationErrors?.storeID,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                storeID: 'Must be a number'
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                storeID: undefined
              });
            }
          }
        }
      },
      {
        accessorKey: 'fraction',
        header: 'Fraction',
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          error: !!validationErrors?.fraction,
          helperText: validationErrors?.fraction,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateFloat(newValue)) {
              setValidationErrors({
                ...validationErrors,
                fraction: 'Must be a Float number'
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                fraction: undefined
              });
            }
          }
        }
      },
      {
        accessorKey: 'category',
        header: 'Category',
        editVariant: 'select',
        editSelectOptions: categories?.map((category) => ({
          label: category.name,
          value: category.name
        })),
        muiEditTextFieldProps: {
          select: true,
          variant: 'outlined',
          error: !!validationErrors?.category,
          helperText: validationErrors?.category
        }
      },
      {
        accessorKey: 'subSector',
        header: 'Sub Sector',
        editVariant: 'select',
        editSelectOptions: subsectors?.map((subsector) => ({
          label: subsector.name,
          value: subsector.name
        })),
        muiEditTextFieldProps: {
          select: true,
          variant: 'outlined',
          error: !!validationErrors?.subSector,
          helperText: validationErrors?.subSector
        }
      },
      {
        accessorKey: 'brand',
        header: 'Brand',
        editVariant: 'select',
        editSelectOptions: brands?.map((brand) => ({
          label: brand.name,
          value: brand.name
        })),
        muiEditTextFieldProps: {
          select: true,
          variant: 'outlined',
          error: !!validationErrors?.brand,
          helperText: validationErrors?.brand
        }
      },
      {
        accessorKey: 'gtin',
        header: 'GTIN',
        muiEditTextFieldProps: {
          type: 'number',
          variant: 'outlined'
        }
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        Edit: () => null
      },
      {
        accessorKey: 'createdDate',
        header: 'Created Date',
        Edit: () => null
      },
      {
        accessorKey: 'lastUpdatedBy',
        header: 'Last Updated By',
        Edit: () => null
      },
      {
        accessorKey: 'lastUpdatedDate',
        header: 'Last Updated Date',
        Edit: () => null
      }
    ],

    [validationErrors, brands, categories, subsectors]
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      })
    },
    enableEditing: true,
    enableRowActions: true,
    enableColumnActions: false,
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdate,
    onEditingRowCancel: () => setValidationErrors({}),
    initialState: {
      density: 'compact',
      showGlobalFilter: true,
      columnPinning: {
        right: ['mrt-row-actions']
      }
    },
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div className="shadow-none border-t-4 border-cyan-700">
        <DialogTitle variant="h6" color="primary">
          Add New Record
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} dividers>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </div>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  });

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} className="h-full w-full shadow-2xl border-t-4 border-cyan-600">
        <Box className="p-2">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Typography variant="h6" as="h2" color="secondary">
                Store to DC Mapping
              </Typography>
              <Typography color="gray" variant="small">
                See information about Stores
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                color="primary"
                onClick={() => {
                  table.setCreatingRow(true);
                }}
                variant="contained">
                Add New Record
              </Button>
            </div>
          </div>
          <hr />
          <div className="flex justify-end py-2 gap-2">
            <BlankExcelDownload />
            <UploadExcelData color="success">
              Upload New Data <br /> Add to Record
            </UploadExcelData>
            <ExcelWithDataDownload />
            <UploadExcelData color="info">
              Re-Upload / <br /> Overwrite Data
            </UploadExcelData>
          </div>
        </Box>
        <MRT_TableContainer table={table} />
        <MRT_TablePagination table={table} />
      </Paper>
    </Container>
  );
};

export default StoreToDc;

const validateRequired = (value) => !!value.length;
const validateInteger = (value) => value.match(/^[0-9]+$/);
const validateFloat = (value) => value.match(/^[0-9]+\.[0-9]+$/);

function validateUser(user) {
  return {
    customerIdentifier: validatecustomerIdentifier(user.customerIdentifier),
    dcID: validateDcId(user.dcID),
    storeID: validateStoreID(user.storeID),
    fraction: validateFraction(user.fraction)
  };
}

function validatecustomerIdentifier(customerIdentifier) {
  let errorMessage = '';

  if (!validateRequired(customerIdentifier)) {
    errorMessage += 'customerIdentifier is Required. ';
  }

  if (!validateInteger(customerIdentifier)) {
    errorMessage += 'customerIdentifier must be an integer. ';
  }

  return errorMessage;
}

function validateDcId(dcID) {
  let errorMessage = '';

  if (!validateRequired(dcID)) {
    errorMessage += 'DC ID is Required. ';
  }

  if (!validateInteger(dcID)) {
    errorMessage += 'DC ID must be an integer. ';
  }

  return errorMessage;
}

function validateStoreID(storeID) {
  let errorMessage = '';

  if (!validateRequired(storeID)) {
    errorMessage += 'store ID is Required. ';
  }

  if (!validateInteger(storeID)) {
    errorMessage += 'Store ID must be an integer. ';
  }

  return errorMessage;
}

function validateFraction(fraction) {
  let errorMessage = '';

  if (!validateRequired(fraction)) {
    errorMessage += 'fraction is Required. ';
  }

  if (!validateFloat(fraction)) {
    errorMessage += 'fraction must be a float. ';
  }

  return errorMessage;
}
