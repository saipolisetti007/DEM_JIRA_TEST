import React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Container, Link } from '@mui/material';
const moment = require('moment');

const Footer = () => {
  return (
    <footer data-testid="footer">
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
          <Typography variant="small">&copy; {moment().year()} - Digital Event Manager</Typography>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
