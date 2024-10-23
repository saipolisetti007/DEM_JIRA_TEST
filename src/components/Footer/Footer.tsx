import React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Container, Link } from '@mui/material';
import rateImage from '../../assets/images/RYE.svg';
const moment = require('moment');

// Footer component
const Footer = () => {
  return (
    <footer data-testid="footer">
      <div className="rate-experience-wrap">
        <Link
          href="https://rateexperience.pg.com/ratings?id=30902"
          className="rate-experience"
          target="_blank">
          <img src={rateImage} alt="Rate Your Experience" />
          <span>Rate your experience</span>
        </Link>
      </div>
      <Alert severity="info">
        In case of any issues please raise INC in ServiceNow here:{' '}
        <strong>
          <Link
            underline="always"
            href="https://pgglobalenterprise.service-now.com/esc?id=ech_index"
            title="servicenow link">
            Link
          </Link>
        </strong>
        . For any other urgent matters please contact{' '}
        <strong>
          Przemyslaw Glinka,{' '}
          <Link href="mailto:glinka.p@pg.com" underline="always" title="mail">
            glinka.p@pg.com
          </Link>
        </strong>
      </Alert>
      <div className="bg-slate-600 text-white p-2 text-center">
        <Container maxWidth="sm">
          <Typography variant="inherit">
            &copy; {moment().year()} - Digital Event Manager
          </Typography>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
