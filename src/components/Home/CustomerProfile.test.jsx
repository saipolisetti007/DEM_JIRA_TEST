import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';

test('Homepage Example Text renders successfully', () => {
  render(
    <BrowserRouter>
      <CustomerProfile />
    </BrowserRouter>
  );
  const HeadingElement = screen.getByText(/Customer Profile Maintenance/i);
  expect(HeadingElement).toBeInTheDocument();
});
