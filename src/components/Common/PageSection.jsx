import { Container } from '@mui/material';
import React from 'react';

// PageSection is a functional component that wraps its children in a styled container.
const PageSection = ({ children }) => {
  return (
    <Container maxWidth="xl" className="py-4">
      <div className="h-full w-full">{children}</div>
    </Container>
  );
};

export default PageSection;
