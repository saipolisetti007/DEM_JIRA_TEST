import React from 'react';
import { Button, Typography } from '@mui/material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
const NavBar = () => {
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
