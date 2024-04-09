import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationButton = ({ navUrl, children }) => {
  return (
    <Button component={Link} to={navUrl} variant="contained" color="primary" size="small">
      {children}
    </Button>
  );
};

export default NavigationButton;
