import React from 'react';
import HomeCardSection from './HomeCardSection';
import NavigationButton from './NavigationButton';

const CustomerProfile = () => {
  return (
    <HomeCardSection title="Customer Profile Maintenance">
      <NavigationButton navUrl="/store-to-dc-mapping"> Store to DC Mapping </NavigationButton>
    </HomeCardSection>
  );
};
export default CustomerProfile;
