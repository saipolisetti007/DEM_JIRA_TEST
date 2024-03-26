import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';

test('Homepage Example Text renders successfully', () => {
  render(
    <BrowserRouter>
      <CustomerProfile />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Customer Profile Maintenance/i);
  expect(headingElement).toBeInTheDocument();
  const buttonComponent = screen.getByRole('button');
  expect(buttonComponent).toBeInTheDocument();
  expect(buttonComponent).toHaveTextContent(/Store to DC Mapping/i);
  fireEvent.click(buttonComponent);
});
