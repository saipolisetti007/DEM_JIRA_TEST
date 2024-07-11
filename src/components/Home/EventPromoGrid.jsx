import React from 'react';
import BackgroundLaptop from '../../assets/dashboard/bg_laptop.svg';
import EVENT_GROUP_ICON from '../../assets/dashboard/group.svg';
import { Typography } from '@mui/material';
import NavigationButton from './NavigationButton';
import PromoCard from './PromoCard';

const EventPromoGrid = () => {
  return (
    <PromoCard backgroundImage={BackgroundLaptop} backgroundColor="#52ADE9">
      <div className="text-left mx-8">
        <img src={EVENT_GROUP_ICON} alt="DEM Logo" width={62} height={62} />
      </div>
      <div className="text-left mx-8">
        <Typography variant="h2">Event promo grid</Typography>
        <Typography variant="subtitle1">Manage events in your promo grid</Typography>
      </div>
      <div className="text-right mx-8">
        <NavigationButton navUrl="/promo-grid" color={'white'} textColor={'primary'}>
          See More
        </NavigationButton>
      </div>
    </PromoCard>
  );
};

export default EventPromoGrid;
