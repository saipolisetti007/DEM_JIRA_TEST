import React from 'react';
import { Typography, Breadcrumbs } from '@mui/material';

const BreadcrumbNavigation = ({ onNavigate }) => {
  const handleClick = (event, target) => {
    event.preventDefault();
    onNavigate(target);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography
        component="a"
        href="/"
        onClick={(event) => handleClick(event, '/')}
        style={{ textDecoration: 'underline', color: 'black', fontWeight: 500 }}>
        Homepage
      </Typography>
      <Typography
        component="a"
        href="/promo-grid"
        onClick={(event) => handleClick(event, '/promo-grid')}
        style={{ textDecoration: 'underline', color: 'black', fontWeight: 500 }}>
        Event Promo Grid
      </Typography>
      <Typography color="action.disabled">Promo Grid Validation Page</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
