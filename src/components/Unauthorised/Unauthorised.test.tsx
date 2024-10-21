import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Unauthorised from './Unauthorised';

describe('Page403 Component', () => {
  test('renders the Page403 component correctly', () => {
    render(<Unauthorised />);

    // Check if the logo is rendered
    const logo = screen.getByAltText('DEM Logo');
    expect(logo).toBeInTheDocument();

    // Check if the main headings are rendered
    const customerHeading = screen.getByText('Customer');
    const promoForecasterHeading = screen.getByText('Promo Forecaster');
    expect(customerHeading).toBeInTheDocument();
    expect(promoForecasterHeading).toBeInTheDocument();

    // Check if the error message is rendered
    const errorMessage = screen.getByText('User is not assigned to any customers');
    expect(errorMessage).toBeInTheDocument();
  });
});
