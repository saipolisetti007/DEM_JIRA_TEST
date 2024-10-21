import { fireEvent, render, screen } from '@testing-library/react';
import { useMsal } from '@azure/msal-react';
import SignIn from './SignIn';
import React from 'react';
jest.mock('@azure/msal-react');

jest.mock('react-router-dom');

describe('SignIn component', () => {
  test('renders call loginRedirect when handleLoginRedirect is called', () => {
    const mockLoginRedirect = jest.fn();

    (useMsal as jest.Mock).mockReturnValue({
      instance: {
        loginRedirect: mockLoginRedirect
      }
    });
    render(<SignIn />);

    const textComponent = screen.getByText(/Sign in to Customer Promo Forecaster/i);
    expect(textComponent).toBeInTheDocument();

    const signinButton = screen.getByRole('button', { name: /Sign In/i });
    expect(signinButton).toBeInTheDocument();
    fireEvent.click(signinButton);
    expect(mockLoginRedirect).toHaveBeenCalled();
  });
});
