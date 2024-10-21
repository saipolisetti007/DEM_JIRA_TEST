import { Container } from '@mui/material';
import React, { ReactNode } from 'react';

type PageSectionPropsType = {
  children: ReactNode;
};

// PageSection is a functional component that wraps its children in a styled container.
const PageSection = ({ children }: PageSectionPropsType) => {
  return (
    <Container maxWidth="xl" className="py-4">
      <div className="h-full w-full">{children}</div>
    </Container>
  );
};

export default PageSection;
