import React from 'react';
import LogoImage from '../../assets/images/logo.svg';

// PageLoader is a functional component that renders a loading screen with a logo and loading text.
// used for with in component to load the data
const PageLoader = () => {
  return (
    <div className="absolute w-full h-full text-center">
      <img src={LogoImage} alt="DEM Logo" width={50} height={50} className="inline-block" />
      <p>Loading ...</p>
    </div>
  );
};

export default PageLoader;
