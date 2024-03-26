import { Card, CardContent, CardHeader, Container } from '@mui/material';
import React from 'react';

const HomeCardSection = ({ title, children }) => {
  return (
    <Container maxWidth="xl" className="my-4">
      <Card elevation={3}>
        <CardHeader title={title} />
        <CardContent>
          <div className="flex gap-3">{children}</div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomeCardSection;
