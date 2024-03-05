import React from 'react';
import { Button } from '@material-tailwind/react';

const NavBar = () => {
  return (
    <nav data-testid="navbar">
      <Button color="cyan">Sign In</Button>
    </nav>
  );
};
export default NavBar;
