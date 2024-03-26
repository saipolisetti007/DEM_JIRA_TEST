import React from 'react';
import HomeCardSection from './HomeCardSection';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const EventGrid = () => {
  return (
    <HomeCardSection title="Event Forecast Input">
      <Link to="/promo-grid">
        <Button variant="contained" color="primary">
          Promo Grid
        </Button>
      </Link>
    </HomeCardSection>
  );
};

export default EventGrid;
