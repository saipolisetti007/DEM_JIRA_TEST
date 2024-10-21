import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import DashboardIcon from '../../assets/dashboard/DashboardIcon';
import GraphIcon from '../../assets/dashboard/GraphIcon';
import ListIcon from '../../assets/dashboard/ListIcon';
import EditIcon from '../../assets/dashboard/EditIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavLinkButton = ({ to, icon: Icon, label, isActiveCheck }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive && isActiveCheck
        ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]'
        : 'text-white'
    }>
    {({ isActive }) => (
      <Button variant="text" color="inherit" className="flex items-center align-middle text-sm">
        <Icon isActive={isActive && isActiveCheck} />
        <span
          className={`text-sm mx-2 ${isActive && isActiveCheck ? 'text-[#003DA5]' : 'text-white'}`}>
          {label}
        </span>
      </Button>
    )}
  </NavLink>
);

const DropdownMenu = ({ isOpen, toggleDropdown }) =>
  isOpen && (
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
  );

const SecondaryNavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const isCPFScreen = (): boolean => {
    return (
      location.pathname === '/cpf-forecast' || location.pathname === '/threshold-settings' || isOpen
    );
  };

  return (
    <nav className="bg-[#003DA5]">
      <Container maxWidth="xl">
        <div className="flex items-center space-x-4 h-[48px]">
          <NavLinkButton to="/" icon={DashboardIcon} label="Dashboard" isActiveCheck={!isOpen} />
          <NavLinkButton
            to="/promo-grid"
            icon={ListIcon}
            label="Event Promo Plan"
            isActiveCheck={!isOpen}
          />
          <div
            className={
              isCPFScreen()
                ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]'
                : 'bg-[#003DA5] text-white'
            }>
            <Button
              variant="text"
              color="inherit"
              onClick={toggleDropdown}
              className="flex items-center align-middle text-sm">
              <GraphIcon isActive={isCPFScreen()} />
              <span className={`text-sm mx-2 'text-[#003DA5]'}`}>CPF Forecast</span>
              <ArrowDropDownIcon style={{ color: isCPFScreen() ? '#003DA5' : '#fff' }} />
            </Button>
            <DropdownMenu isOpen={isOpen} toggleDropdown={toggleDropdown} />
          </div>
          <NavLinkButton
            to="/manual-da"
            icon={EditIcon}
            label="Manual DA"
            isActiveCheck={!isOpen}
          />
        </div>
      </Container>
    </nav>
  );
};

export default SecondaryNavBar;
