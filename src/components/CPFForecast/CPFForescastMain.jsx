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
const CPFForescastMain = () => {
  const [cpfData, setCpfData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
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
    sku: []
  });

  const [selectedFilters, setSelectedFilters] = useState({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: []
  });

  const fetchFilters = async () => {
    try {
      const response = await cpfFilters();
      setFilterOptions({
        subsector: response?.subsector,
        category: response?.category,
        brand: response?.brand,
        brandForm: response?.prod_form_name,
        sku: response?.sku
      });
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
      const filterParams = Object.keys(filters).reduce((acc, key) => {
        acc[key] = filters[key].length > 0 && filters[key][0] !== 'All' ? filters[key] : [];
        return acc;
      }, {});
      const response = await cpfGetForecast(filterParams);
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

  useEffect(() => {
    debouncedFetchData(selectedFilters);
    return () => {
      debouncedFetchData.cancel();
    };
  }, [selectedFilters]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleFilterChange = (filterKey, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: values
    }));
  };

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

  const handleCloseUnitChnage = () => {
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
                  <IconButton onClick={handleClose}>
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
                    selectedUnit={selectedUnit}
                    editedValues={editedValues}
                    setEditedValues={setEditedValues}
                    isExanped={index === expandedIndex}
                    onAccordionChange={() => handleAccordionChange(index)}
                    onSubmit={fetchData}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </PageSection>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseUnitChnage}
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

export default CPFForescastMain;
