import React from 'react';
import LogoImage from '../../assets/images/logo.svg';

const DefaultPageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <img src={LogoImage} alt="DEM Logo" width={100} height={100} className="animate-spin" />
    </div>
  );
};

export default DefaultPageLoader;
