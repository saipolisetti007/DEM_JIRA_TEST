import React from 'react';
import { Box } from '@mui/material';

const PromoCard = ({ backgroundImage, backgroundColor, children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '49%',
        height: '100%',
        minHeight: '250px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: backgroundColor,
        borderRadius: '10px',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: backgroundColor,
          opacity: 0.9,
          zIndex: 1,
          borderRadius: '10px',
          mixBlendMode: 'multiply'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
      }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          width: '100%',
          position: 'relative',
          zIndex: 2,
          color: 'white',
          borderRadius: '10px'
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default PromoCard;
