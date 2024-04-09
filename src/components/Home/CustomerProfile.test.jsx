import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';

test('CustonerProfile renders successfully', () => {
  render(
    <BrowserRouter>
      <CustomerProfile />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Customer Profile Maintenance/i);
  expect(headingElement).toBeInTheDocument();
});
