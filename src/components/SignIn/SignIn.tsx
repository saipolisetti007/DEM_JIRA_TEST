import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import SignInImage from '../../assets/images/signinBG.svg';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SignInLogo from '../Common/SignInLogo';

// SignIn component
const SignIn = () => {
  const { instance } = useMsal(); // Get the MSAL instance

  // Function to handle login redirect
  const handleLoginRedirect = (): void => {
    instance.loginRedirect(loginRequest); // Trigger login redirect with the specified login request
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={7} md={7}>
        <div className="flex flex-col items-center h-full w-full ">
          <SignInLogo />

          <div className="flex-1 text-center">
            <Typography component="h2" variant="h2" color="primary" className="mb-2">
              Sign in to Customer Promo Forecaster
            </Typography>

            <Typography component="p" variant="body1" className="mb-4">
              Add events and stay up to date with the shipping forecast
            </Typography>

            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleLoginRedirect}
              className="px-10 pl-10 pt-2 pb-2 rounded-full">
              Sign In
            </Button>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={false}
        sm={5}
        md={5}
        sx={{
          backgroundImage: `url(${SignInImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </Grid>
  );
};

export default SignIn;
