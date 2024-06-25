import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';

import { useDispatch, useSelector } from 'react-redux';
import { fecthUserProfile } from './userProfileSlice';
import { fecthEvents } from '../PromoGrid/eventsSlice';

const NavBar = () => {
  const [hasFetchData, setHasFetchData] = useState(false);
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

  useEffect(() => {
    fecthData();
  }, [activeAccount, dispatch]);

  const fecthData = async () => {
    if (activeAccount && !hasFetchData) {
      dispatch(fecthUserProfile());
      setHasFetchData(true);
    } else if (!activeAccount) {
      setHasFetchData(false);
    }
  };

  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];

  useEffect(() => {
    if (customerId) {
      dispatch(fecthEvents(customerId));
    }
  }, [customerId, dispatch]);

  return (
    <nav data-testid="navbar">
      <AuthenticatedTemplate>
        <div className="flex gap-2 items-center font-bold">
          <Typography variant="subtitle2" component="p">
            {activeAccount ? activeAccount.name : 'Unknown'}
          </Typography>
          <Button size="small" variant="contained" color="primary" onClick={handleLogoutRedirect}>
            Sign out
          </Button>
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
