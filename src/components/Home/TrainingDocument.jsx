import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Threshold settings component card
const TrainingDocument = () => {
  return (
    <Card variant="outlined" className="material-card">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <Typography variant="h2" color="primary">
            Documentation
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Access training materials
          </Typography>
        </div>
        <Button
          component={Link}
          to="https://pgone.sharepoint.com/:p:/r/sites/CustomerPromoForecasterUserInterfaceCPFUI/Shared%20Documents/Training/Athena%20Work%20process%20CPF%20UI%20(SharePoint).pptx?d=wa57c5e637b53450d8515a21a048283cf&csf=1&web=1&e=ZZ0UTL"
          variant="outlined"
          target="_blank"
          size="small"
          color="primary"
          sx={{
            paddingX: 2.5
          }}>
          Show More
        </Button>
      </div>
    </Card>
  );
};

export default TrainingDocument;
