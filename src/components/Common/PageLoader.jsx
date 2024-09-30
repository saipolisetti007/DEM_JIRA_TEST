import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// PageLoader is a functional component that renders a loading screen with a logo and loading text.
// used for with in component to load the data
const PageLoader = () => {
  return (
    <div className="absolute w-full h-full text-center">
      <CircularProgress />
    </div>
  );
};

export default PageLoader;
