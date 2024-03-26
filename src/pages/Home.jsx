import React from 'react';
import CustomerProfile from '../components/Home/CustomerProfile';
import EventGrid from '../components/Home/EventGrid';

const Home = () => {
  return (
    <div data-testid="home">
      <CustomerProfile />
      <EventGrid />
    </div>
  );
};

export default Home;
