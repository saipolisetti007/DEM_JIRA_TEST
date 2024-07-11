import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import LogoImage from '../../assets/images/logo.svg';
import SignInImage from '../../assets/images/signinBG.svg';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SignIn = () => {
  const { instance } = useMsal();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={7} md={7}>
        <div className="flex flex-col items-center h-full w-full ">
          <div className="flex-1 text-center p-8">
            <img src={LogoImage} alt="DEM Logo" width={100} height={100} className="m-auto" />
            <Typography component="h1" variant="h5">
              Digital Event Manager
            </Typography>
          </div>

          <div className="flex-1 text-center">
            <Typography component="h2" variant="h2" color="primary" className="mb-2">
              Sign in to Digital Event Manager
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
