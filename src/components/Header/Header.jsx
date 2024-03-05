import React from 'react';
import Logo from './Logo';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header data-testid="header" className="text-gray-600 body-font shadow-lg py-2">
      <div className="container mx-auto flex justify-between flex-wrap flex-col md:flex-row items-center">
        <Logo />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
