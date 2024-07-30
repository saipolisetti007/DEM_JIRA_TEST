import React, { useEffect, useState, useCallback } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import SkuItem from './SkuItem';
import { cpfFilters, cpfGetForecast } from '../../api/cpfForecastApi';
import PageLoader from '../Common/PageLoader';
import Filters from '../Common/Filters';
import InfoSnackBar from '../Common/InfoSnackBar';
import { debounce } from 'lodash';
import ConfirmationDialog from './ConfirmationDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { reduceFilters, mapFilterParams } from '../../utils/filterUtils';
import createDebouncedFetchFilters from '../../utils/debounceUtils';

const CPFForecastMain = () => {
  const [cpfData, setCpfData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
  const [selectedUnit, setSelectedUnit] = useState('su');
  const [editedValues, setEditedValues] = useState({});
  const [pendingUnitChange, setPendingUnitChange] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: []
  });

  const [selectedFilters, setSelectedFilters] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: []
  });

  const fetchFilters = async (filters = {}) => {
    try {
      const response = await cpfFilters(filters);
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        subsector: response?.subsector || prevOptions.subsector,
        category: response?.category || prevOptions.category,
        brand: response?.brand || prevOptions.brand,
        brandForm: response?.prod_form_name || prevOptions.brandForm,
        sku: response?.sku || prevOptions.sku,
        prodName: response?.prod_name || prevOptions.prodName,
        customerItemNumber: response?.customer_item_number || prevOptions.customerItemNumber
      }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  const fetchData = async (filters) => {
    setIsPageLoading(true);
    setIsError(false);
    try {
      const filterParams = reduceFilters(filters);
      const mappedFilterParams = mapFilterParams(filterParams);
      const response = await cpfGetForecast(mappedFilterParams);
      setCpfData(response);
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      setIsLoading(true);
      setIsError(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  const debouncedFetchFilters = useCallback(
    createDebouncedFetchFilters(cpfFilters, setFilterOptions, setIsSnackOpen, setSnackBar),
    []
  );

  const handleFilterChange = (filterKey, values) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterKey]: values
    };

    setSelectedFilters(updatedFilters);
    debouncedFetchFilters(updatedFilters);
  };

  useEffect(() => {
    debouncedFetchData(selectedFilters);
    return () => {
      debouncedFetchData.cancel();
    };
  }, [selectedFilters]);

  useEffect(() => {
    fetchFilters(selectedFilters);
  }, []);

  const handleAccordionChange = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleUnitChange = (unit) => {
    if (Object.keys(editedValues).length > 0) {
      setPendingUnitChange(unit);
      setOpenDialog(true);
    } else {
      setSelectedUnit(unit);
    }
  };

  const handleConfirmUnitChange = () => {
    setSelectedUnit(pendingUnitChange);
    setEditedValues({});
    setOpenDialog(false);
  };

  const handleCloseUnitChange = () => {
    setPendingUnitChange(null);
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    await fetchData(selectedFilters);
  };

  return (
    <>
      <PageSection>
        <DefaultPageHeader title="CPF Forecast" subtitle="Select the SKU to see the forecast" />
        <hr />
        <div className="relative min-h-80">
          <Box className="p-2 flex justify-between">
            <Filters
              isLoading={isLoading}
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            <div>
              <IconButton
                aria-label="more"
                id="unit-button"
                color="primary"
                aria-controls={open ? 'unit-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="unit-menu"
                MenuListProps={{
                  'aria-labelledby': 'unit-button'
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem sx={{ display: 'flex', gap: 2 }}>
                  <Typography component="span" variant="h6">
                    Select units:
                  </Typography>
                  <ButtonGroup variant="outlined" aria-label="Select units">
                    {['cs', 'it', 'su', 'msu'].map((unit) => (
                      <Button
                        key={unit}
                        variant={selectedUnit === unit ? 'contained' : 'outlined'}
                        onClick={() => handleUnitChange(unit)}>
                        {unit}
                      </Button>
                    ))}
                  </ButtonGroup>
                  <IconButton onClick={handleClose} data-testid="closeUnits">
                    <CloseIcon />
                  </IconButton>
                </MenuItem>
              </Menu>
            </div>
          </Box>

          {isPageLoading ? (
            <PageLoader />
          ) : (
            <div className="relative">
              {cpfData.length === 0 ? (
                <Alert severity="error">No records found...</Alert>
              ) : (
                cpfData.map((item, index) => (
                  <SkuItem
                    key={item.sku}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isError={isError}
                    isRefetching={isRefetching}
                    setIsRefetching={setIsRefetching}
                    index={index}
                    sku={item.sku}
                    prod_name={item.prod_name}
                    csFactor={item.cs_factor}
                    itFactor={item.it_factor}
                    data={item.forecast}
                    isExpanded={index === expandedIndex}
                    selectedUnit={selectedUnit}
                    editedValues={editedValues}
                    setEditedValues={setEditedValues}
                    isExanped={index === expandedIndex}
                    onAccordionChange={() => handleAccordionChange(index)}
                    onSubmit={handleSubmit}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </PageSection>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseUnitChange}
        onConfirm={handleConfirmUnitChange}
        title="Are you sure.. ? Change units?"
        contentHeading=" Unsaved edited units wiil be reset"
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

export default CPFForecastMain;
