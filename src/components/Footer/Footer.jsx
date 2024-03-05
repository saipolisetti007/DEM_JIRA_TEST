import React from 'react';
import { Typography } from '@material-tailwind/react';
const moment = require('moment');

const Footer = () => {
  return (
    <footer data-testid="footer">
      <Typography variant="small" className="bg-light-blue-100 text-center">
        &copy; {moment().year()} - Digital Event Manager
      </Typography>
    </footer>
  );
};

export default Footer;
