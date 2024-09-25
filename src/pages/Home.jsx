import React from 'react';
import EventPromoGrid from '../components/Home/EventPromoGrid';
import CPFForecast from '../components/Home/CPFForecast';
import DefaultPageHeader from '../components/Common/DefaultPageHeader';
import PageSection from '../components/Common/PageSection';
import ThresholdSettings from '../components/Home/ThresholdSettings';
import { Typography } from '@mui/material';
import TrainingDocument from '../components/Home/TrainingDocument';

// Home page component
const Home = () => {
  return (
    <PageSection>
      <div data-testid="home">
        <DefaultPageHeader title="Dashboard" subtitle="Manage your CPF Dashboard" />

        <section className="py-4 mt-10">
          <Typography variant="h3" component="h2" className="mb-3">
            Visit the main sections of the CPF app
          </Typography>
          <div className="flex justify-start flex-wrap flex-col gap-5 md:flex-row items-center ">
            <EventPromoGrid />
            <CPFForecast />
            <ThresholdSettings />
          </div>
        </section>
        <section className="py-4 mt-10">
          <Typography variant="h3" component="h2" className="mb-3">
            Useful materials
          </Typography>
          <div className="flex justify-start flex-wrap flex-col gap-5 md:flex-row items-center">
            <TrainingDocument />
          </div>
        </section>
      </div>
    </PageSection>
  );
};

export default Home;
