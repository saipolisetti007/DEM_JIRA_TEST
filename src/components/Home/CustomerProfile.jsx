import React from 'react';
import { Card, CardContent, Button, Container, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerProfile = () => {
  return (
    <Container maxWidth="xl">
      <Card elevation={3}>
        <CardHeader title="Customer Profile Maintenance" />

        <CardContent>
          <Link to="/store-to-dc-mapping">
            <Button variant="contained" color="primary">
              Store to DC Mapping
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};
export default CustomerProfile;
