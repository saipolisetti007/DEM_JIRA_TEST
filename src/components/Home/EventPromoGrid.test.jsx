import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import EventPromoGrid from './EventPromoGrid';

jest.mock('./NavigationButton', () => (props) => (
  <div data-testid="navigation-button" {...props}>
    {props.children}
  </div>
));

describe('EventPromoGrid', () => {
  test('should render the component correctly', () => {
    render(
      <MemoryRouter>
        <EventPromoGrid />
      </MemoryRouter>
    );

    expect(screen.getByText('Event Promo Plan')).toBeInTheDocument();
    expect(screen.getByText('Manage events in your promo grid')).toBeInTheDocument();
  });

  test('should display the image with correct alt text', () => {
    render(
      <MemoryRouter>
        <EventPromoGrid />
      </MemoryRouter>
    );

    const img = screen.getByAltText('DEM Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'group.svg');
  });

  test('should render Typography elements with correct text', () => {
    render(
      <MemoryRouter>
        <EventPromoGrid />
      </MemoryRouter>
    );

    expect(screen.getByText('Event Promo Plan')).toBeInTheDocument();
    expect(screen.getByText('Manage events in your promo grid')).toBeInTheDocument();
  });

  test('should render NavigationButton component with correct props', () => {
    render(
      <MemoryRouter>
        <EventPromoGrid />
      </MemoryRouter>
    );

    const navigationButton = screen.getByTestId('navigation-button');
    expect(navigationButton).toBeInTheDocument();
    expect(navigationButton).toHaveTextContent('See More');
    expect(navigationButton).toHaveAttribute('navUrl', '/promo-grid');
    expect(navigationButton).toHaveAttribute('color', 'white');
    expect(navigationButton).toHaveAttribute('textColor', 'primary');
  });
});
