import React from 'react'
import { Typography } from "@material-tailwind/react";

const Header = () => {
  return (
    <header data-testid="header">
      <Typography component="h1" variant="h3" className="bg-blue-900 text-white text-center">
          Digital Event Manager
      </Typography>
    </header>
  )
}

export default Header