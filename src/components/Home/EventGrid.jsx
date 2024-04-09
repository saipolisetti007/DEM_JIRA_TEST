import React from 'react';
import HomeCardSection from './HomeCardSection';
import CPFForecastButton from './CPFForecastButton';
import NavigationButton from './NavigationButton';

const EventGrid = () => {
  return (
    <HomeCardSection title="Event Forecast Input">
      <NavigationButton navUrl="/promo-grid"> Promo Grid </NavigationButton>
      <CPFForecastButton />
    </HomeCardSection>
  );
};

export default EventGrid;
