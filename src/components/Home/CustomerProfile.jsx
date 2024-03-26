import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeCardSection from './HomeCardSection';

const CustomerProfile = () => {
  return (
    <HomeCardSection title="Customer Profile Maintenance">
      <Link to="/store-to-dc-mapping">
        <Button variant="contained" color="primary">
          Store to DC Mapping
        </Button>
      </Link>
    </HomeCardSection>
  );
};
export default CustomerProfile;
