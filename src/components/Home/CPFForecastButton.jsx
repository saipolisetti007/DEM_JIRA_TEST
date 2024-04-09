import { Badge } from '@mui/material';
import React from 'react';
import NavigationButton from './NavigationButton';

const CPFForecastButton = () => {
  return (
    <Badge badgeContent={50} color="secondary">
      <NavigationButton navUrl="/cpf-forecast"> Pending approval </NavigationButton>
    </Badge>
  );
};

export default CPFForecastButton;
