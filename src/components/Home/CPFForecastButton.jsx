import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavigationButton from './NavigationButton';
import { cpfPendingCount } from '../../api/cpfForecastApi';

const CPFForecastButton = () => {
  const [count, setCount] = useState();
  const fetchCpfPendingCount = async () => {
    const response = await cpfPendingCount();
    setCount(response.pending_approvals_count);
  };
  useEffect(() => {
    fetchCpfPendingCount();
  }, []);
  return (
    <Badge badgeContent={count} color="secondary">
      <NavigationButton navUrl="/cpf-forecast"> Pending approval </NavigationButton>
    </Badge>
  );
};

export default CPFForecastButton;
