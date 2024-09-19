import React from 'react';
import PromoCard from './PromoCard';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/dashboard/bg_threshold.svg';
import Threshold_settings from '../../assets/dashboard/Threshold_settings_icon.svg';

// Threshold settings component card
const ThresholdSettings = () => {
  return (
    <PromoCard backgroundImage={LogoImage} backgroundColor="#003DA5">
      <div className="text-left mx-8">
        <img src={Threshold_settings} alt="Threshold settings icon" width={62} height={62} />
      </div>
      <div className="text-left mx-8">
        <Typography variant="h2">Threshold settings</Typography>
        <Typography variant="subtitle1">Adjust the settings and manage the forecast</Typography>
      </div>
      <div className="text-right mx-8">
        <Button
          component={Link}
          to="/threshold-settings"
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            backgroundColor: '#fff',
            paddingX: 5,
            '&:hover': {
              backgroundColor: '#f1f1f1' // Custom hover background color
            }
          }}>
          See More
        </Button>
      </div>
    </PromoCard>
  );
};

export default ThresholdSettings;
