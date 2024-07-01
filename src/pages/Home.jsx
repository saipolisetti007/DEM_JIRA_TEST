import React from 'react';
import EventPromoGrid from '../components/Home/EventPromoGrid';
import CPFForecast from '../components/Home/CPFForecast';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <div className="grid gap-24" data-testid="home">
      <div></div>
      <Container maxWidth="xl">
        <div className="flex justify-between flex-wrap flex-col md:flex-row items-center">
          <Typography variant="h5" color="primary">
            Homepage
          </Typography>
        </div>
        <Typography variant="subtitle1">Select filters to see more detailed promo grid </Typography>
      </Container>
      <Container maxWidth="xl">
        <div className="flex justify-between flex-wrap flex-col md:flex-row items-center">
          <EventPromoGrid />
          <CPFForecast />
        </div>
      </Container>
    </div>
  );
};

export default Home;
