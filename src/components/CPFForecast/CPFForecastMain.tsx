import React, { useEffect, useState, useCallback } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import { Alert, Box, Button, ButtonGroup, Typography } from '@mui/material';
import SkuItem from './SkuItem';
import { cpfFilters, cpfGetForecast } from '../../api/cpfForecastApi';
import PageLoader from '../Common/PageLoader';
import Filters from '../Common/Filters';
import InfoSnackBar from '../Common/InfoSnackBar';
import { debounce } from 'lodash';
import ConfirmationDialog from './ConfirmationDialog';
import { reduceFilters, mapFilterParams } from '../../utils/filterUtils';
import createDebouncedFetchFilters from '../../utils/debounceUtils';
import DefaultPageLoader from '../Common/DefaultPageLoader';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { SnackBarType } from '../ThresholdSettings/ThresholdSettingsData';

export type SelectedFiltersType = {
  subsector: string[];
  category: string[];
  brand: string[];
  brandForm: string[];
  sku: string[];
  prodName: string[];
  customerItemNumber: string[];
  eventType: string[];
  eventSubtype: string[];
  status: string[];
  comments: string[];
  customerId?: string[];
  active?: boolean;
  custFlag?: boolean;
};

type CPFForecastResponseType = {
  skus: any[];
  cpf_enabled: boolean;
};

type CPFDataType = {
  sku: string;
  prod_name: string;
  pending_approvals_count: number;
  missing_count: number;
  warning_count: number;
};

export type BaseFilterResponseType = {
  subsector: string[];
  category: string[];
  brand: string[];
  sku: string[];
  status: string[];
  comments: string[];
};
export type FilterOptionsType = BaseFilterResponseType & {
  brandForm: string[];
  prodName: string[];
  customerItemNumber: string[];
  eventType: string[];
  eventSubtype: string[];
};

export type FilterResponseType = BaseFilterResponseType & {
  prod_form_name: string[];
  prod_name: string[];
  customer_item_number: string[];
  event_type: string[];
  event_subtype: string[];
  customer_id: string[];
};

// CPF Forecast main component to display the forecast data
const CPFForecastMain = () => {
  const [cpfData, setCpfData] = useState<CPFDataType[] | []>([]);
  const [cpfEnabled, setCpfEnabled] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState<SnackBarType>({ message: '', severity: '' });
  const [selectedUnit, setSelectedUnit] = useState<string | null>('su');
  const [editedValues, setEditedValues] = useState({});
  const [pendingUnitChange, setPendingUnitChange] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [filtersUpdated, setFiltersUpdated] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const { customerId } = useAppSelector((state) => state.userProfileData);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: [],
    eventType: [],
    eventSubtype: [],
    status: [],
    comments: []
  });

  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    subsector: [],
    category: [],
    brand: [],
    brandForm: [],
    sku: [],
    prodName: [],
    customerItemNumber: [],
    eventType: [],
    eventSubtype: [],
    status: [],
    comments: []
  });

  // Fetch filter options from API
  const fetchFilters = async (filters: SelectedFiltersType | {} = {}) => {
    setIsLoading(true);
    try {
      if (customerId) {
        (filters as SelectedFiltersType).customerId = [customerId];
      }
      const response: FilterResponseType = await cpfFilters(filters);
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        subsector: response?.subsector || prevOptions.subsector,
        category: response?.category || prevOptions.category,
        brand: response?.brand || prevOptions.brand,
        brandForm: response?.prod_form_name || prevOptions.brandForm,
        sku: response?.sku || prevOptions.sku,
        prodName: response?.prod_name || prevOptions.prodName,
        customerItemNumber: response?.customer_item_number || prevOptions.customerItemNumber,
        eventType: response?.event_type || prevOptions.eventType,
        eventSubtype: response?.event_subtype || prevOptions.eventSubtype,
        status: response?.status || prevOptions.status,
        comments: response?.comments || prevOptions.comments
      }));
      setIsLoading(false);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        customerId: customerId ? [customerId] : [],
        status: status ? [status] : []
      }));
      setFiltersUpdated(true);
    } catch (error) {
      setFiltersUpdated(true);
      setIsLoading(false);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  // Fetch forecast data from API
  const fetchData = async (filters: SelectedFiltersType) => {
    setIsPageLoading(true);
    try {
      const filterParams: SelectedFiltersType = reduceFilters(filters);
      const mappedFilterParams: SelectedFiltersType = mapFilterParams(filterParams);
      const response: CPFForecastResponseType = await cpfGetForecast(mappedFilterParams);
      setCpfData(response.skus);
      setCpfEnabled(response.cpf_enabled);
      setIsPageLoading(false);
      setExpandedIndex(-1);
    } catch (error) {
      setIsPageLoading(false);
      setIsLoading(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  // Update selected filters when customerId changes
  useEffect(() => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      customerId: customerId ? [customerId] : []
    }));
  }, [customerId]);

  // Fetch filters when customerId changes
  useEffect(() => {
    fetchFilters(selectedFilters);
  }, [customerId]);

  // Debounced fetch data function
  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  // Debounced fetch filters function
  const debouncedFetchFilters = useCallback(
    createDebouncedFetchFilters(cpfFilters, setFilterOptions, setIsSnackOpen, setSnackBar, [
      'active',
      'custFlag'
    ]),
    []
  );

  // Handle filter change
  const handleFilterChange = (filterKey, values) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterKey]: filterKey === 'customerId' ? [values] : values
    };

    setSelectedFilters(updatedFilters);
    debouncedFetchFilters(updatedFilters);
  };

  // Fetch data when filters are updated
  useEffect(() => {
    if (filtersUpdated) {
      debouncedFetchData(selectedFilters);
    }

    return () => {
      debouncedFetchData.cancel();
    };
  }, [selectedFilters, filtersUpdated]);

  // Handle accordion change
  const handleAccordionChange = (index: number): void => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  // Handle unit change
  const handleUnitChange = (unit: string): void => {
    if (Object.keys(editedValues).length > 0) {
      setPendingUnitChange(unit);
      setOpenDialog(true);
    } else {
      setSelectedUnit(unit);
    }
  };

  // Confirm unit change warning dialog
  const handleConfirmUnitChange = (): void => {
    setSelectedUnit(pendingUnitChange);
    setEditedValues({});
    setOpenDialog(false);
  };

  // Close unit change warning dialog
  const handleCloseUnitChange = (): void => {
    setPendingUnitChange(null);
    setOpenDialog(false);
  };

  // Render loading page if filters are not updated
  if (!filtersUpdated) {
    return <DefaultPageLoader />;
  }

  return (
    <>
      <PageSection>
        <Box className="flex justify-between items-center">
          <DefaultPageHeader
            title="CPF Review"
            subtitle="Select Filters and SKU to see the forecast"
          />
          <div>
            <Box className="flex justify-between items-center">
              <div>
                <Typography component="span" variant="h6" sx={{ marginRight: 2 }}>
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
              </div>
            </Box>
          </div>
        </Box>

        <hr />
        <div className="relative min-h-80">
          <Filters
            isLoading={isLoading}
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {isPageLoading ? (
            <PageLoader />
          ) : (
            <div className="relative">
              {cpfData.length === 0 ? (
                <Alert severity="error">No records found...</Alert>
              ) : (
                cpfData.map((item: CPFDataType, index: number) => (
                  <SkuItem
                    key={item.sku}
                    index={index}
                    sku={item.sku}
                    prod_name={item.prod_name}
                    isExpanded={index === expandedIndex}
                    selectedUnit={selectedUnit}
                    editedValues={editedValues}
                    setEditedValues={setEditedValues}
                    onAccordionChange={() => handleAccordionChange(index)}
                    selectedFilters={selectedFilters}
                    cpfEnabled={cpfEnabled}
                    pendingCount={item.pending_approvals_count}
                    missingCount={item.missing_count}
                    warningCount={item.warning_count}
                    fetchFilters={fetchFilters}
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
        contentHeading="Unsaved edited units will be reset"
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
