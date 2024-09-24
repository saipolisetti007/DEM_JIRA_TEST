import { Button } from '@mui/material';
import React from 'react';
/**
 * StatusBadges component to display status badges for warnings, missing items, and pending approvals.
 * @param {Object} props - Component props.
 * @param {number} props.missingCount - Number of missing items.
 * @param {number} props.warningCount - Number of warning items.
 */

const StatusBadges = ({ missingCount, warningCount }) => {
  return (
    <div className="flex items-center">
      {warningCount > 0 && (
        <Button color="warning" variant="contained" className="mr-2" size="small">
          Alert
        </Button>
      )}
      {missingCount > 0 && (
        <Button color="error" variant="contained" className="mr-2" size="small">
          Missing
        </Button>
      )}
    </div>
  );
};

export default StatusBadges;
