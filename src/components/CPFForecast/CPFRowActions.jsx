import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const CPFRowActions = ({ row, onChange }) => {
  const [approve, setApprove] = useState('');
  const [color, setColor] = useState('success');
  const handleChange = (event, newValue) => {
    setApprove(newValue);
    if (newValue == 'approve') {
      setColor('success');
    } else {
      setColor('error');
    }
    onChange(row.original.id, row.original.product_id, newValue);
  };
  return (
    <div data-testid="row-actions">
      <ToggleButtonGroup
        size="small"
        value={approve}
        exclusive
        color={color}
        onChange={handleChange}
        aria-label="approve or reject">
        <ToggleButton value="approve" aria-label="approve">
          Approve
        </ToggleButton>
        <ToggleButton value="reject" aria-label="reject">
          Reject
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default CPFRowActions;
