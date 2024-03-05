import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const CustomerProfile = () => {
  return (
    <section className="container mx-auto my-10">
      <Card>
        <CardHeader color="blue-gray" className="relative">
          <Typography component="h2" variant="h4" className="bg-indigo-500 py-1 text-center">
            Customer Profile Maintenance
          </Typography>
        </CardHeader>
        <CardBody>
          <Link to="/store-to-dc-mapping">
            <Button color="cyan">Store to DC Mapping</Button>
          </Link>
        </CardBody>
      </Card>
    </section>
  );
};
export default CustomerProfile;
