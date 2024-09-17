import React, { useState } from 'react';
import {
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerId } from './userProfileSlice';

const NavBar = () => {
  // State to manage the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { instance } = useMsal();
  let activeAccount;
  // Extract user data and customer ID from the Redux store
  const { userData, customerId } = useSelector((state) => state.userProfileData);
  const customers = userData?.customers;
  // Get the active account from MSAL instance
  if (instance) {
    activeAccount = instance.getActiveAccount();
  }
  // Handle login redirect
  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest);
  };
  // Handle logout redirect
  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };
  // Open the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Check if the select box should be disabled
  const isSelectBoxDisabled = () => {
    return Object.keys(customers).length === 1;
  };
  // Get initials from the user's name
  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names
      .slice(0, 2)
      .map((n) => n.charAt(0))
      .join('');
    return initials.toUpperCase();
  };

  return (
    <nav data-testid="navbar">
      <AuthenticatedTemplate>
        <div className="flex gap-2 items-center font-bold">
          {activeAccount ? (
            <>
              {customerId && (
                <FormControl sx={{ minWidth: 250 }} size="small">
                  <InputLabel id="customer-id">
                    <Typography variant="h5" component="h5">
                      Customer Name
                    </Typography>
                  </InputLabel>
                  <Select
                    labelId="customer-id"
                    id="customer-id"
                    data-testid="customer-id"
                    value={customerId}
                    label="Customer Name"
                    onChange={(e) => {
                      dispatch(setCustomerId(e.target.value));
                    }}
                    disabled={isSelectBoxDisabled()}
                    sx={{
                      '& .MuiSelect-icon': {
                        display: isSelectBoxDisabled() ? 'none' : 'block'
                      },
                      'div[role=combobox]': {
                        WebkitTextFillColor: 'rgba(0, 0, 0, 1)'
                      }
                    }}>
                    {customers &&
                      Object.entries(customers).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <Avatar
                data-testid="user-avatar"
                onClick={handleMenuOpen}
                sx={{ cursor: 'pointer', bgcolor: 'primary.light', padding: 3 }}>
                {getInitials(activeAccount.name) || 'Unknown'}
              </Avatar>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem data-testid="signout-button" onClick={handleLogoutRedirect}>
                  Sign out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Typography variant="subtitle2" component="p">
              Unknown
            </Typography>
          )}
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button size="small" variant="contained" color="primary" onClick={handleLoginRedirect}>
          Sign In
        </Button>
      </UnauthenticatedTemplate>
    </nav>
  );
};

export default NavBar;
