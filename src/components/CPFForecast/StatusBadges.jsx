import { Button } from '@mui/material';
import React from 'react';

const StatusBadges = ({ missingCount, pendingCount, warningCount }) => {
  return (
    <div className="flex items-center">
      {warningCount > 0 && (
        <Button color="warning" variant="contained" className="mr-2" size="small">
          Warning
        </Button>
      )}
      {missingCount > 0 && (
        <Button color="error" variant="contained" className="mr-2" size="small">
          Missing
        </Button>
      )}
      {pendingCount > 0 ? (
        <Button color="info" variant="outlined" className="mr-2" size="small">
          Pending Approval
        </Button>
      ) : (
        <Button color="info" variant="contained" className="mr-2" size="small">
          Approved
        </Button>
      )}
    </div>
  );
};

export default StatusBadges;
