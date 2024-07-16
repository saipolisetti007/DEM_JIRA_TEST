import React, { useEffect, useState, useCallback } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import { Alert, Box } from '@mui/material';
import SkuItem from './SkuItem';
import { cpfFilters, cpfGetForecast } from '../../api/cpfForecastApi';
import PageLoader from '../Common/PageLoader';
import Filters from '../Common/Filters';
import InfoSnackBar from '../Common/InfoSnackBar';
import { debounce } from 'lodash';

const CPFForescastMain = () => {
  const [cpfData, setCpfData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({ message: '', severity: '' });

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

  return (
    <>
      <PageSection>
        <DefaultPageHeader title="CPF Forecast" subtitle="Select the SKU to see the forecast" />
        <hr />
        <div className="relative min-h-80">
          <Box className="p-2">
            <Filters
              isLoading={isLoading}
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
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
                    data={item.forecast}
                    isExpanded={index === expandedIndex}
                    onAccordionChange={() => handleAccordionChange(index)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </PageSection>
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
