import React from 'react';
import { Typography, Breadcrumbs } from '@mui/material';

// BreadcrumbNavigation component to render breadcrumb navigation links
const BreadcrumbNavigation = ({ onNavigate }) => {
  // Function to handle click events on breadcrumb links
  const handleClick = (event, target) => {
    event.preventDefault();
    onNavigate(target); // Call the onNavigate function with the target path
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* Link to the Homepage */}
      <Typography
        component="a"
        href="/"
        onClick={(event) => handleClick(event, '/')}
        style={{ textDecoration: 'underline', color: 'black', fontWeight: 500 }}>
        Homepage
      </Typography>
      {/* Link to the Event Promo Plan page */}
      <Typography
        component="a"
        href="/promo-grid"
        onClick={(event) => handleClick(event, '/promo-grid')}
        style={{ textDecoration: 'underline', color: 'black', fontWeight: 500 }}>
        Event Promo Plan
      </Typography>
      {/* Current page indicator */}
      <Typography color="action.disabled">Promo Grid Validation Page</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
