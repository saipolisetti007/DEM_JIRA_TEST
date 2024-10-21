import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import moment from 'moment';

type ManageColumnsPropsType = {
  columns: Record<string, any>[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: any;
  cookieName: string;
};

// Function to set a cookie
const setCookie = (name: string, value: string, days: number): void => {
  const expires = moment().add(days, 'days'); // Calculate the expiration date
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`; // Set the cookie
};

// Function to get a cookie by name
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`; // Get all cookies
  const parts = value.split(`; ${name}=`); // Split cookies by the desired name
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    if (cookieValue) {
      return decodeURIComponent(cookieValue); // Return the cookie value if found
    }
  }
};

/**
 * ManageColumns component to manage the visibility of table columns.
 * @param {Object} props - Component props.
 * @param {Array} props.columns - Array of column objects.
 * @param {Object} props.columnVisibility - Object representing the visibility of each column.
 * @param {Function} props.onColumnVisibilityChange - Function to handle column visibility change.
 * @param {string} props.cookieName - Name of the cookie to store column visibility.
 */
const ManageColumns = ({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  cookieName
}: ManageColumnsPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Effect to load saved column visibility from cookies on component mount
  useEffect(() => {
    const savedVisibility = getCookie(cookieName);
    if (savedVisibility) {
      const visibility = JSON.parse(savedVisibility);
      Object.keys(visibility).forEach((key) => {
        onColumnVisibilityChange(key, visibility[key]);
      });
    }
  }, [cookieName, onColumnVisibilityChange]);

  // Handle column visibility change
  const handleColumnVisibilityChange = (changedColumnId: number, newVisibility: boolean) => {
    onColumnVisibilityChange(changedColumnId, newVisibility);

    // Save updated column visibility to cookies
    const updatedVisibility = {
      ...columnVisibility,
      [changedColumnId]: newVisibility
    };
    setCookie(cookieName, JSON.stringify(updatedVisibility), 365); // Save the updated visibility to cookies
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
        <button onClick={handleClose} data-testid="closeMenu" style={{ display: 'none' }} />
      </Menu>
    </div>
  );
};

export default ManageColumns;
