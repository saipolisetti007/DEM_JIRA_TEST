import React, { useEffect, useState } from 'react';
import { Button, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './userProfileSlice';
import { fetchEvents } from '../PromoGrid/eventsSlice';

const NavBar = () => {
  const [hasFetchData, setHasFetchData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { instance } = useMsal();
  let activeAccount;

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

  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
  };

  useEffect(() => {
    fecthData();
  }, [activeAccount, dispatch]);

  const fecthData = async () => {
    if (activeAccount && !hasFetchData) {
      dispatch(fetchUserProfile());
      setHasFetchData(true);
    } else if (!activeAccount) {
      setHasFetchData(false);
    }
  };

  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];

  useEffect(() => {
    if (customerId) {
      dispatch(fetchEvents(customerId));
    }
  }, [customerId, dispatch]);

  return (
    <nav data-testid="navbar">
      <AuthenticatedTemplate>
        <div className="flex gap-2 items-center font-bold">
          {activeAccount ? (
            <>
              <Avatar
                data-testid="user-avatar"
                onClick={handleMenuOpen}
                sx={{ cursor: 'pointer', bgcolor: 'primary.light', padding: 3 }}>
                {getInitials(activeAccount.name) || 'Unkown'}
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
