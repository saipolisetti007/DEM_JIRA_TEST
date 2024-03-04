import React from 'react'
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer data-testid="footer">
    <Typography variant="small" className="bg-light-blue-100 text-center">
        &copy;  Digital Event Manager
    </Typography>
    </footer>
  )
}

export default Footer