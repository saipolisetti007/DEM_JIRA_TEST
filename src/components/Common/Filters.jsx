import React from 'react';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Function to format filter keys into user-friendly labels
function formatFilterKey(filterKey) {
  const customLabels = {
    sku: 'SKU',
    active: 'Status',
    brandForm: 'Brand Form',
    prodName: 'Product Name',
    customerItemNumber: 'Customer Item Number',
    customerId: 'Customer ID',
    custFlag: 'Customization Flag',
    eventType: 'Event Type',
    eventSubtype: 'Event Subtype'
  };

  return customLabels[filterKey] || filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
}

// Styled component for Autocomplete with custom styles
const StyledAutocomplete = styled(Autocomplete)(({ theme, disabled }) => ({
  '& .MuiAutocomplete-tag': {
    display: 'none'
  },
  '& .MuiInputBase-root': {
    backgroundColor: disabled ? theme.palette.action.disabledBackground : 'inherit'
  }
}));

// Main Filters component with filter options, loading state, selected filters, and filter change handler
const Filters = ({ filterOptions, isLoading, selectedFilters, onFilterChange }) => {
  // Function to handle filter change
  const handleFilterChange = (filterKey) => (event, values, reason) => {
    if (reason === 'selectOption' && values.includes('All')) {
      onFilterChange(filterKey, ['All', ...filterOptions[filterKey]]);
    } else if (
      reason === 'removeOption' &&
      selectedFilters[filterKey]?.includes('All') &&
      !values.includes('All')
    ) {
      onFilterChange(filterKey, []);
    } else if (reason === 'removeOption' && selectedFilters[filterKey]?.includes('All')) {
      onFilterChange(
        filterKey,
        values.filter((value) => value !== 'All')
      );
    } else {
      onFilterChange(filterKey, values);
    }
  };

  // Function to render filter label for each filter with count
  const renderLabel = (filterKey) => {
    const count = selectedFilters[filterKey]?.length || 0;
    const baseLabel = formatFilterKey(filterKey);
    return count > 0 ? `${baseLabel} (${count})` : baseLabel;
  };

  return (
    <Box>
      <div className="my-3">
        <Typography variant="h6" component="p" className="my-2">
          Select filters:
        </Typography>

        <div className="flex items-center gap-2 flex-wrap">
          {Object.keys(filterOptions)?.map((filterKey) => {
            // Determine if the filter is single-select based on the filter key
            const isSingleSelect = filterKey === 'customerId';
            // If it's single-select, use the filter options directly
            // Otherwise, add an 'All' option at the beginning
            const options = isSingleSelect
              ? filterOptions[filterKey] || []
              : ['All', ...(filterOptions[filterKey] || [])];
            return (
              <FormControl
                data-testid="filter-form-control"
                sx={{ mx: 0.7 }}
                key={filterKey}
                className="min-w-[120px] w-[154.8px] m-0" // temp fix for urgent request
                size="small">
                <StyledAutocomplete
                  multiple={!isSingleSelect}
                  disableCloseOnSelect={!isSingleSelect}
                  options={options}
                  value={selectedFilters[filterKey] || []}
                  onChange={handleFilterChange(filterKey)}
                  loading={isLoading}
                  size="small"
                  noOptionsText="No options available"
                  getOptionLabel={(option) => String(option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={renderLabel(filterKey)}
                      placeholder="Search..."
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      {!isSingleSelect && (
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={
                            option === 'All'
                              ? selectedFilters[filterKey]?.length ===
                                filterOptions[filterKey]?.length + 1
                              : selected
                          }
                        />
                      )}
                      {option}
                    </li>
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderTags={() => null}
                  ListboxProps={{
                    className: 'with-search-bar',
                    sx: {
                      '& .MuiAutocomplete-groupLabel': {
                        display: 'none'
                      },
                      '& .MuiAutocomplete-groupUl': {
                        padding: 0
                      },
                      '& .MuiAutocomplete-inputRoot': {
                        paddingBottom: '1rem'
                      }
                    }
                  }}
                />
              </FormControl>
            );
          })}
        </div>
      </div>
    </Box>
  );
};

export default Filters;
