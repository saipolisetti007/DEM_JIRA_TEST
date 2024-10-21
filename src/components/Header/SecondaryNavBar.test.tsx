import React, { ReactElement } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SecondaryNavBar from './SecondaryNavBar';
import '@testing-library/jest-dom/extend-expect';
type RenderWithRouterOptions = {
  route?: string;
};
describe('SecondaryNavBar component', () => {
  const renderWithRouter = (ui: ReactElement, { route = '/' }: RenderWithRouterOptions = {}) => {
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
    expect(screen.getByText(/Event Promo Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/CPF Forecast/i)).toBeInTheDocument();
    // expect(screen.getByText(/Manual DA/i)).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    renderWithRouter(<SecondaryNavBar />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Promo Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/CPF Forecast/i)).toBeInTheDocument();
    // expect(screen.getByText(/Manual DA/i)).toBeInTheDocument();
  });

  test('applies active class to the correct link when navigating to /', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/' });
    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Event Promo Plan/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/CPF Forecast/i).closest('div')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    // expect(screen.getByText(/Manual DA/i).closest('a')).not.toHaveClass(
    //   'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    // );
  });

  test('applies active class to the correct link when navigating to /promo-grid', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/promo-grid' });
    expect(screen.getByText(/Event Promo Plan/i).closest('a')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Dashboard/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/CPF Forecast/i).closest('div')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    // expect(screen.getByText(/Manual DA/i).closest('a')).not.toHaveClass(
    //   'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    // );
  });

  test('applies active class to the correct link when navigating to /cpf-forecast', () => {
    renderWithRouter(<SecondaryNavBar />, { route: '/cpf-forecast' });
    expect(screen.getByText(/CPF Forecast/i).closest('div')).toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Dashboard/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    expect(screen.getByText(/Event Promo Plan/i).closest('a')).not.toHaveClass(
      'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    );
    // expect(screen.getByText(/Manual DA/i).closest('a')).not.toHaveClass(
    //   'bg-white font-bold rounded-full px-2 text-[#003DA5]'
    // );
  });

  // test('applies active class to the correct link when navigating to /manual-da', () => {
  //   renderWithRouter(<SecondaryNavBar />, { route: '/manual-da' });
  //   expect(screen.getByText(/CPF Forecast/i).closest('div')).not.toHaveClass(
  //     'bg-white font-bold rounded-full px-2 text-[#003DA5]'
  //   );
  //   expect(screen.getByText(/Dashboard/i).closest('a')).not.toHaveClass(
  //     'bg-white font-bold rounded-full px-2 text-[#003DA5]'
  //   );
  //   expect(screen.getByText(/Event Promo Plan/i).closest('a')).not.toHaveClass(
  //     'bg-white font-bold rounded-full px-2 text-[#003DA5]'
  //   );
  //   expect(screen.getByText(/Manual DA/i).closest('a')).toHaveClass(
  //     'bg-white font-bold rounded-full px-2 text-[#003DA5]'
  //   );
  // });

  test('navigates to the correct route', () => {
    renderWithRouter(<SecondaryNavBar />);
    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/Event Promo Plan/i).closest('a')).toHaveAttribute(
      'href',
      '/promo-grid'
    );
    const cpfButton = screen.getByText(/CPF Forecast/i);
    expect(cpfButton).toBeInTheDocument();
    fireEvent.click(cpfButton);
    expect(screen.getByText('Forecast Review')).toBeInTheDocument();
    // expect(screen.getByText(/Manual DA/i).closest('a')).toHaveAttribute('href', '/manual-da');
  });
});
