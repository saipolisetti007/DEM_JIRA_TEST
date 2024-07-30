import React from 'react';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

function formatFilterKey(filterKey) {
  const customLabels = {
    sku: 'SKU',
    active: 'Status',
    brandForm: 'Brand Form',
    prodName: 'Product Name',
    customerItemNumber: 'Customer Item Number'
  };

  return customLabels[filterKey] || filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
}

const StyledAutocomplete = styled(Autocomplete)(({ theme, disabled }) => ({
  '& .MuiAutocomplete-tag': {
    display: 'none'
  },
  '& .MuiInputBase-root': {
    backgroundColor: disabled ? theme.palette.action.disabledBackground : 'inherit'
  }
}));

const Filters = ({ filterOptions, isLoading, selectedFilters, onFilterChange }) => {
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

  const renderLabel = (filterKey) => {
    const count = selectedFilters[filterKey]?.length || 0;
    const baseLabel = formatFilterKey(filterKey);
    const label = count > 0 ? `${baseLabel} (${count})` : baseLabel;
    return label;
  };

  return (
    <Box>
      <div className="flex my-3">
        <div className="flex items-center">
          <span className="mr-5 font-montserrat font-bold">Select filters: </span>
          <div>
            {Object.keys(filterOptions)?.map((filterKey) => (
              <FormControl
                data-testid="filter-form-control"
                sx={{ mx: 0.7 }}
                key={filterKey}
                className="min-w-[120px] w-[154.8px]" // temp fix for urgent request
                size="small">
                <StyledAutocomplete
                  multiple
                  disableCloseOnSelect
                  options={['All', ...(filterOptions[filterKey] || [])]}
                  value={selectedFilters[filterKey] || []}
                  onChange={handleFilterChange(filterKey)}
                  loading={isLoading}
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
                      <Checkbox
                        style={{ marginRight: 8 }}
                        checked={
                          option === 'All'
                            ? selectedFilters[filterKey]?.length ===
                              filterOptions[filterKey]?.length + 1
                            : selected
                        }
                      />
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
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Filters;
