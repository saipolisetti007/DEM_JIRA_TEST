import { Container } from '@mui/material';
import React from 'react';

const PageSection = ({ children }) => {
  return (
    <Container maxWidth="xl" className="py-8">
      <div className="h-full w-full">{children}</div>
    </Container>
  );
};

export default PageSection;
