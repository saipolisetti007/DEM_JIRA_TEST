import React from 'react';
import { Button } from '@mui/material';

const NavBar = () => {
  return (
    <nav data-testid="navbar">
      <Button variant="contained" color="primary">
        Sign In
      </Button>
    </nav>
  );
};
export default NavBar;
