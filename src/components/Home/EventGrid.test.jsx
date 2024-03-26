import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventGrid from './EventGrid';

test('Homepage Example Text renders successfully', () => {
  render(
    <BrowserRouter>
      <EventGrid />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Event Forecast Input/i);
  expect(headingElement).toBeInTheDocument();

  const buttonComponent = screen.getByRole('button');
  expect(buttonComponent).toBeInTheDocument();
  expect(buttonComponent).toHaveTextContent(/Promo Grid/i);
  fireEvent.click(buttonComponent);
});
