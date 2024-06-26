import React from 'react';
import LogoImage from '../../assets/images/logo.svg';

const PageLoader = () => {
  return (
    <div className="absolute w-full h-full text-center">
      <img src={LogoImage} alt="DEM Logo" width={50} height={50} className="inline-block" />
      <p>Loading ...</p>
    </div>
  );
};

export default PageLoader;
