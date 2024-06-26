import React from 'react';
import LogoImage from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div data-testid="logo">
      <Link to="/" className="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0">
        <img src={LogoImage} alt="DEM Logo" width={50} height={50} />
        <span data-testid="headertext" className="ml-1 text-xl">
          Digital Event Manager
        </span>
      </Link>
    </div>
  );
};

export default Logo;
