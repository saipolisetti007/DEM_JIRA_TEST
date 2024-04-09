import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventGrid from './EventGrid';

test('EventGrid renders successfully', () => {
  render(
    <BrowserRouter>
      <EventGrid />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Event Forecast Input/i);
  expect(headingElement).toBeInTheDocument();
});
