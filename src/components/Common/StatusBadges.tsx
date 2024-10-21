import React from 'react';
import { Button } from '@mui/material';

type StatusBadgesPropsType = {
  value: string;
};

const StatusBadges = ({ value }: StatusBadgesPropsType) => {
  const statusMap = {
    Created: { color: 'create', label: 'Created' },
    Submitted: { color: 'success', label: 'Submitted' },
    Error: { color: 'error', label: 'Error' },
    Cancelled: { color: 'cancel', label: 'Cancelled' },
    Expired: { color: 'expired', label: 'Expired' }
  };

  const { color, label } = statusMap[value];

  return (
    <Button size="small" variant="contained" color={color} style={{ pointerEvents: 'none' }}>
      {label}
    </Button>
  );
};

export default StatusBadges;
