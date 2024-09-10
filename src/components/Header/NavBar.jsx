import React, { useEffect, useState } from 'react';
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
import { fetchUserProfile, setCustomerId } from './userProfileSlice';
import { fetchCountries } from '../PromoGrid/countryCodeSlice';

const NavBar = () => {
  const [hasFetchData, setHasFetchData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { instance } = useMsal();
  let activeAccount;

  const { userData } = useSelector((state) => state.userProfileData);
  const { customerId } = useSelector((state) => state.userProfileData);
  const customers = userData?.customers;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSelectBoxDisabled = () => {
    return Object.keys(customers).length === 1;
  };
  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names
      .slice(0, 2)
      .map((n) => n.charAt(0))
      .join('');
    return initials.toUpperCase();
  };

  useEffect(() => {
    fecthData();
  }, [activeAccount, dispatch]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const fecthData = async () => {
    if (activeAccount && !hasFetchData) {
      dispatch(fetchUserProfile());
      setHasFetchData(true);
    } else if (!activeAccount) {
      setHasFetchData(false);
    }
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
