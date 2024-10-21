import React from 'react';
import LogoImage from '../../assets/images/cpfLogo.svg';
import { Link } from 'react-router-dom';

//Logo component
const Logo = () => {
  return (
    <div data-testid="logo">
      <Link to="/" className="flex items-center mb-4 md:mb-0">
        <img src={LogoImage} alt="DEM Logo" />
      </Link>
    </div>
  );
};

export default Logo;
