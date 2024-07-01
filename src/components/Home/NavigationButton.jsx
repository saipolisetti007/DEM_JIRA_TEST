import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationButton = ({ navUrl, children, color, textColor, loading }) => {
  return (
    <Button
      sx={{
        color: textColor,
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: color,
        paddingLeft: 5,
        paddingRight: 5,
        '&:hover': {
          backgroundColor: 'info.light'
        },
        '&.Mui-disabled': {
          color: 'rgba(255, 255, 255, 0.8)',
          backgroundColor: color
        }
      }}
      disabled={loading}
      component={Link}
      to={navUrl}
      size="small">
      {children}
    </Button>
  );
};

export default NavigationButton;
