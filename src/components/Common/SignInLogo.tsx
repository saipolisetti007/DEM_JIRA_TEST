import React from 'react';
import Typography from '@mui/material/Typography';
import LogoImage from '../../assets/images/logo.svg';
const SignInLogo = () => {
  return (
    <div className="flex-1 text-center p-8">
      <img src={LogoImage} alt="DEM Logo" className="m-auto" />
      <Typography component="h1" variant="h5" marginTop={1}>
        Customer
      </Typography>
      <Typography component="h1" variant="h5">
        Promo Forecaster
      </Typography>
    </div>
  );
};

export default SignInLogo;
