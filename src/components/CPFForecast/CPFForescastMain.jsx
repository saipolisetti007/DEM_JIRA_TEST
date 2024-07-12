import React, { useEffect, useState } from 'react';
import PageSection from '../Common/PageSection';
import DefaultPageHeader from '../Common/DefaultPageHeader';
import { Alert, Box } from '@mui/material';
import SkuItem from './SkuItem';
import { cpfFilters, cpfGetForecast } from '../../api/cpfForecastApi';
import PageLoader from '../Common/PageLoader';
import Filters from '../Common/Filters';
import InfoSnackBar from '../Common/InfoSnackBar';

const CPFForescastMain = () => {
  const [cpfData, setCpfData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
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
    subsector: '',
    category: '',
    brand: '',
    brandForm: '',
    sku: ''
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
    } catch (error) {
      setIsLoading(true);
      setIsError(true);
      setIsSnackOpen(true);
      setSnackBar({
        message: 'Network Error !!!',
        severity: 'error'
      });
    }
  };

  const handleFilterChange = (filterKey, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: values
    }));
  };

  const fetchData = async () => {
    try {
      setIsPageLoading(true);
      const filterParams = Object.keys(selectedFilters).reduce((acc, key) => {
        acc[key] =
          selectedFilters[key].length > 0 && selectedFilters[key][0] !== 'All'
            ? selectedFilters[key]
            : [];
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

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedFilters]);

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
                    isExanped={index === expandedIndex}
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
