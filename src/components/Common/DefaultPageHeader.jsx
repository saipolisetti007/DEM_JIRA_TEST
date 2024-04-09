import { Typography } from '@mui/material';
import React from 'react';

const DefaultPageHeader = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h6" as="h2" color="secondary">
        {title}
      </Typography>
      <Typography variant="small">{subtitle}</Typography>
    </div>
  );
};

export default DefaultPageHeader;
