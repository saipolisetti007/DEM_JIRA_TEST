import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import moment from 'moment';

// Function to set a cookie
const setCookie = (name, value, days) => {
  const expires = moment().add(days, 'days'); // Calculate the expiration date
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`; // Set the cookie
};

// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`; // Get all cookies
  const parts = value.split(`; ${name}=`); // Split cookies by the desired name
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift()); // Return the cookie value if found
};

const COOKIE_NAME = 'columnVisibility'; // Name of the cookie to store column visibility

/**
 * ManageColumns component to manage the visibility of table columns.
 * @param {Object} props - Component props.
 * @param {Array} props.columns - Array of column objects.
 * @param {Object} props.columnVisibility - Object representing the visibility of each column.
 * @param {Function} props.onColumnVisibilityChange - Function to handle column visibility change.
 */
const ManageColumns = ({ columns, columnVisibility, onColumnVisibilityChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Effect to load saved column visibility from cookies on component mount
  useEffect(() => {
    const savedVisibility = getCookie(COOKIE_NAME);
    if (savedVisibility) {
      const visibility = JSON.parse(savedVisibility);
      Object.keys(visibility).forEach((key) => {
        onColumnVisibilityChange(key, visibility[key]);
      });
    }
  }, []);

  // Handle column visibility change
  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    onColumnVisibilityChange(changedColumnId, newVisibility);

    // Save updated column visibility to cookies
    const updatedVisibility = {
      ...columnVisibility,
      [changedColumnId]: newVisibility
    };
    setCookie(COOKIE_NAME, JSON.stringify(updatedVisibility), 365); // Save the updated visibility to cookies
  };

  return (
    <div>
      <Button
        id="manage-column-button"
        aria-controls={open ? 'manage-column-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="primary"
        startIcon={<TableChartIcon />}
        onClick={handleClick}>
        Manage Columns
      </Button>
      <Menu
        id="manage-column-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        MenuListProps={{
          'aria-labelledby': 'manage-column-button'
        }}>
        {columns
          .filter((column) => column.id !== 'mrt-row-select' && column.id !== 'mrt-row-actions')
          .map((column) => (
            <MenuItem key={column.id} className="column-menu-item">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      columnVisibility[column.id] !== undefined ? columnVisibility[column.id] : true
                    }
                    onChange={(event) =>
                      handleColumnVisibilityChange(column.id, event.target.checked)
                    }
                  />
                }
                label={column.header}
              />
            </MenuItem>
          ))}

        <span onClick={handleClose} data-testid="closeMenu" />
      </Menu>
    </div>
  );
};

export default ManageColumns;
