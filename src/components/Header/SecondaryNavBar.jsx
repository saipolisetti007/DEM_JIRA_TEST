import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import DashboardIcon from '../../assets/dashboard/DashboardIcon';
import GraphIcon from '../../assets/dashboard/GraphIcon';
import ListIcon from '../../assets/dashboard/ListIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Seconday Nav bar for Navigation MenuNa
const SecondaryNavBar = () => {
  const location = useLocation(); // Get the current location from react-router
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if the current screen is CPF related
  const isCPFScreen = () => {
    return (
      location.pathname === '/cpf-forecast' || location.pathname === '/threshold-settings' || isOpen
    );
  };
  return (
    <nav className="bg-[#003DA5]">
      <Container maxWidth="xl">
        <div className="flex items-center space-x-4  h-[48px]">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive && !isOpen
                ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]'
                : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                className="flex items-center align-middle text-sm"
                variant="text"
                color="inherit">
                <DashboardIcon isActive={isActive && !isOpen} />
                <span
                  className={`text-sm mx-2 font-bold ${isActive && !isOpen ? 'text-[#003DA5]' : 'text-white'}`}>
                  Dashboard
                </span>
              </Button>
            )}
          </NavLink>
          <NavLink
            to="/promo-grid"
            className={({ isActive }) =>
              isActive && !isOpen
                ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]'
                : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                variant="text"
                color="inherit"
                className="flex items-center align-middle text-sm">
                <ListIcon isActive={isActive && !isOpen} className="mr-2" />
                <span
                  className={`text-sm mx-2 ${isActive && !isOpen ? 'text-[#003DA5]' : 'text-white'}`}>
                  Event Promo Plan
                </span>
              </Button>
            )}
          </NavLink>
          <div
            className={
              isCPFScreen()
                ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]'
                : ' bg-[#003DA5] text-white'
            }>
            <Button
              variant="text"
              color="inherit"
              onClick={toggleDropdown}
              className="flex items-center align-middle text-sm">
              <GraphIcon isActive={isCPFScreen()} className="mr-2 bg-white" />
              <span className={`text-sm mx-2 'text-[#003DA5]'}`}>CPF Forecast</span>
              <ArrowDropDownIcon style={{ color: isCPFScreen() ? '#003DA5' : '#fff' }} />
            </Button>
            {isOpen && (
              <ul className="absolute mt-2 w-48 bg-white border border-gray-30 p-2">
                <li className="text-black pb-2 pl-1 pt-2 hover:bg-[#0300001A]">
                  <NavLink to="/cpf-forecast" onClick={toggleDropdown}>
                    <Typography className="text-md">Forecast Review</Typography>
                  </NavLink>
                </li>
                <li className="text-black pb-2 pl-1 pt-2 hover:bg-[#0300001A]">
                  <NavLink to="/threshold-settings" onClick={toggleDropdown}>
                    <Typography className="text-md">Threshold Settings</Typography>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default SecondaryNavBar;
