import { Typography } from '@mui/material';
import React from 'react';

const DefaultPageHeader = ({ title, subtitle }) => {
  return (
    <div className="pt-4 pb-8">
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
