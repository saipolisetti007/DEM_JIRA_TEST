import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
const moment = require('moment');

const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-slate-600 text-white p-2 text-center">
      <Container maxWidth="sm">
        <Typography variant="small">&copy; {moment().year()} - Digital Event Manager</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
