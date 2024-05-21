import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function Filters({ filterOptions, isLoading, selectedFilters, onFilterChange }) {
  const handleFilterChange = (filterKey) => (event) => {
    const { value } = event.target;
    onFilterChange(filterKey, [value]);
  };

  return (
    <Box>
      <div className="flex mx-2 my-3">
        <div className="flex items-center">
          <span className="mr-5 font-montserrat font-bold">Select filters: </span>
          <div>
            {Object.keys(filterOptions)?.map((filterKey) => (
              <FormControl
                data-testid="filter-form-control"
                sx={{ mx: 0.7 }}
                key={filterKey}
                className="min-w-[120px] w-[160px]"
                size="small">
                <InputLabel id={`${filterKey}-label`}>
                  {filterKey?.charAt(0).toUpperCase() + filterKey?.slice(1)}
                </InputLabel>
                <Select
                  data-testid="filter-form-select-input"
                  disabled={isLoading}
                  className="flex h-[40px] items-center 
                  overflow-hidden text-ellipsis whitespace-nowrap text-left"
                  labelId={`${filterKey}-label`}
                  id={`${filterKey}-select`}
                  value={selectedFilters[filterKey]}
                  onChange={handleFilterChange(filterKey)}
                  label={filterKey}>
                  {filterOptions[filterKey]?.length === 0 ? (
                    <MenuItem disabled value="">
                      <Typography variant="body2" color="textSecondary">
                        No options available
                      </Typography>
                    </MenuItem>
                  ) : (
                    filterOptions[filterKey]?.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        className="whitespace-nowrap text-ellipsis overflow-hidden justify-start">
                        <Box
                          component="div"
                          className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                          {option}
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Filters;
