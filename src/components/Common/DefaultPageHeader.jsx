import { Typography } from '@mui/material';
import React from 'react';

// DefaultPageHeader is a functional component that renders a page header with a title and subtitle.
const DefaultPageHeader = ({ title, subtitle }) => {
  return (
    <div className="pt-2 pb-4">
      <Typography component="h1" variant="h2" color="primary">
        {title}
      </Typography>
      <Typography component="h2" variant="body1">
        {subtitle}
      </Typography>
    </div>
  );
};

export default DefaultPageHeader;
