import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SignInImage from '../../assets/images/signinBG.svg';
import SignInLogo from '../Common/SignInLogo';

// Unauthorised component
const Unauthorised = () => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={7} md={7}>
        <div className="flex flex-col items-center h-full w-full ">
          <SignInLogo />

          <div className="flex-1 text-center">
            <Typography component="h2" variant="h2" color="primary" className="mb-2">
              User is not assigned to any customers
            </Typography>

            <Typography component="p" variant="body1" className="mb-4">
              Please contact <strong>Deanna Oreilly</strong> or <strong>Mykal Hodge</strong> for
              assistance
            </Typography>
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

export default Unauthorised;
