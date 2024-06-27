import { Typography } from '@mui/material';
import React from 'react';

const DefaultPageHeader = ({ title, subtitle }) => {
  return (
    <div>
      <Typography component="h1" variant="h5" color="primary">
        {title}
      </Typography>
      <Typography component="h2" variant="body1">
        {subtitle}
      </Typography>
    </div>
  );
};

export default DefaultPageHeader;
