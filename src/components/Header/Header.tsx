import React from 'react';
import Logo from './Logo';
import NavBar from './NavBar';
import { Container } from '@mui/material';

//Header component
const Header = () => {
  return (
    <header data-testid="header" className="text-gray-600 body-font shadow-lg py-2">
      <Container maxWidth="xl">
        <div className="flex justify-between flex-wrap flex-col md:flex-row items-center">
          <Logo />
          <NavBar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
