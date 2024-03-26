import { Container, Paper } from '@mui/material';
import React from 'react';

const PageSection = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={3} className="h-full w-full shadow-2xl border-t-4 border-cyan-600">
        {children}
      </Paper>
    </Container>
  );
};

export default PageSection;
