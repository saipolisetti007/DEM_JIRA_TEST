import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import DashboardIcon from '../../assets/dashboard/DashboardIcon';
import GraphIcon from '../../assets/dashboard/GraphIcon';
import ListIcon from '../../assets/dashboard/ListIcon';
// import TruckIcon from '../../assets/dashboard/TruckIcon';
import SettingsIcon from '@mui/icons-material/Settings';

const SecondaryNavBar = () => {
  return (
    <nav className="bg-[#003DA5]">
      <Container maxWidth="xl">
        <div className="flex items-center space-x-4  h-[48px]">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]' : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                className="flex items-center align-middle text-sm"
                variant="text"
                color="inherit">
                <DashboardIcon isActive={isActive} />
                <span
                  className={`text-sm mx-2 font-bold ${isActive ? 'text-[#003DA5]' : 'text-white'}`}>
                  Dashboard
                </span>
              </Button>
            )}
          </NavLink>
          <NavLink
            to="/promo-grid"
            className={({ isActive }) =>
              isActive ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]' : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                variant="text"
                color="inherit"
                className="flex items-center align-middle text-sm">
                <ListIcon isActive={isActive} className="mr-2" />
                <span className={`text-sm mx-2 ${isActive ? 'text-[#003DA5]' : 'text-white'}`}>
                  Event Promo Plan
                </span>
              </Button>
            )}
          </NavLink>

          <NavLink
            to="/cpf-forecast"
            className={({ isActive }) =>
              isActive ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]' : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                variant="text"
                color="inherit"
                className="flex items-center align-middle text-sm">
                <GraphIcon isActive={isActive} className="mr-2" />
                <span className={`text-sm mx-2 ${isActive ? 'text-[#003DA5]' : 'text-white'}`}>
                  CPF Forecast
                </span>
              </Button>
            )}
          </NavLink>

          <NavLink
            to="/threshold-settings"
            className={({ isActive }) =>
              isActive ? 'bg-white font-bold rounded-full px-2 text-[#003DA5]' : 'text-white'
            }>
            {({ isActive }) => (
              <Button
                variant="text"
                color="inherit"
                className="flex items-center align-middle text-sm">
                <SettingsIcon isActive={isActive} className="mr-2" />
                <span className={`text-sm mx-2 ${isActive ? 'text-[#003DA5]' : 'text-white'}`}>
                  Threshold Settings
                </span>
              </Button>
            )}
          </NavLink>
        </div>
      </Container>
    </nav>
  );
};

export default SecondaryNavBar;
