import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// DefaultPageLoader is a functional component that renders a loading spinner with a logo for page loading
const DefaultPageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default DefaultPageLoader;
