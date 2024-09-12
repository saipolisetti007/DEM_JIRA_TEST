import React from 'react';
import EventPromoGrid from '../components/Home/EventPromoGrid';
import CPFForecast from '../components/Home/CPFForecast';
import DefaultPageHeader from '../components/Common/DefaultPageHeader';
import PageSection from '../components/Common/PageSection';
import ThresholdSettings from '../components/Home/ThresholdSettings';

const Home = () => {
  return (
    <PageSection>
      <div data-testid="home">
        <DefaultPageHeader
          title="Homepage"
          subtitle="Select filters to see more detailed promo grid"
        />

        <div className="flex justify-between flex-wrap flex-col md:flex-row items-center py-4 mt-10">
          <EventPromoGrid />
          <CPFForecast />
          <ThresholdSettings />
        </div>
      </div>
    </PageSection>
  );
};

export default Home;
