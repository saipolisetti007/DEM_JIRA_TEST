import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SecondaryNavBar from './SecondaryNavBar';
import '@testing-library/jest-dom/extend-expect';

describe('SecondaryNavBar component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders without crashing', () => {
    renderWithRouter(<SecondaryNavBar />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Promo Grid/i)).toBeInTheDocument();
    expect(screen.getByText(/CPF Forecast/i)).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    renderWithRouter(<SecondaryNavBar />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Promo Grid/i)).toBeInTheDocument();
    expect(screen.getByText(/CPF Forecast/i)).toBeInTheDocument();
  });

  test('applies active class to the correct link when navigating to /', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/' });
    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Event Promo Grid/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/CPF Forecast/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
  });

  test('applies active class to the correct link when navigating to /promo-grid', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/promo-grid' });
    expect(screen.getByText(/Event Promo Grid/i).closest('a')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Dashboard/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/CPF Forecast/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
  });

  test('applies active class to the correct link when navigating to /cpf-forecast', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/cpf-forecast' });
    expect(screen.getByText(/CPF Forecast/i).closest('a')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Dashboard/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Event Promo Grid/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
  });

  test('navigates to the correct route', () => {
    renderWithRouter(<SecondaryNavBar />);
    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/Event Promo Grid/i).closest('a')).toHaveAttribute(
      'href',
      '/promo-grid'
    );
    expect(screen.getByText(/CPF Forecast/i).closest('a')).toHaveAttribute('href', '/cpf-forecast');
  });
});
