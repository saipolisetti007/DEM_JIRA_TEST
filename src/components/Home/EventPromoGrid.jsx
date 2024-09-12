import React from 'react';
import BackgroundLaptop from '../../assets/dashboard/bg_laptop.svg';
import EVENT_GROUP_ICON from '../../assets/dashboard/group.svg';
import { Button, Typography } from '@mui/material';
import PromoCard from './PromoCard';
import { Link } from 'react-router-dom';

const EventPromoGrid = () => {
  return (
    <PromoCard backgroundImage={BackgroundLaptop} backgroundColor="#52ADE9">
      <div className="text-left mx-8">
        <img src={EVENT_GROUP_ICON} alt="DEM Logo" width={62} height={62} />
      </div>
      <div className="text-left mx-8">
        <Typography variant="h2">Event Promo Plan</Typography>
        <Typography variant="subtitle1">Manage events in your promo grid</Typography>
      </div>
      <div className="text-right mx-8">
        <Button
          component={Link}
          to="/promo-grid"
          variant="outlined"
          color="info"
          size="small"
          sx={{
            backgroundColor: '#fff',
            paddingX: 5,
            '&:hover': {
              backgroundColor: '#f1f1f1'
            }
          }}>
          See More
        </Button>
      </div>
    </PromoCard>
  );
};

export default EventPromoGrid;
