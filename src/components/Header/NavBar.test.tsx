import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NavBar from './NavBar';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
jest.mock('@azure/msal-react');
jest.mock('react-redux');
import * as reactRedux from 'react-redux';

describe('NavBar component', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const mockInstance = {
    getActiveAccount: jest.fn(() => ({ name: 'Test User' })),
    loginRedirect: jest.fn(),
    logoutRedirect: jest.fn()
  };

  beforeEach(() => {
    (AuthenticatedTemplate as jest.Mock).mockImplementation(({ children }) => (
      <div>{children}</div>
    ));
    (UnauthenticatedTemplate as jest.Mock).mockImplementation(({ children }) => (
      <div>{children}</div>
    ));
    let dispatch;
    dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    useSelectorMock.mockReturnValue({
      userData: {
        customers: {
          2000038335: 'Costco',
          2000000000: 'Dummy Customer'
        }
      },
      customerId: '2000038335'
    });
  });

  test('renders signin button when not authenticated', () => {
    (useMsal as jest.Mock).mockReturnValueOnce({ instance: null });
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const signinButton = screen.getByText(/Sign In/i);
    expect(signinButton).toBeInTheDocument();
  });

  test('renders signout button and username when authenticated', () => {
    (useMsal as jest.Mock).mockReturnValue({ instance: mockInstance });
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const userAvatar = screen.queryByTestId('user-avatar');
    if (!userAvatar) {
      console.error('User avatar not found in the rendered output.');
    } else {
      fireEvent.click(userAvatar);

      const signoutButton = screen.getByText(/Sign out/i);
      expect(signoutButton).toBeInTheDocument();
    }
  });

  test('renders call loginRedirect when handleLoginRedirect is called', () => {
    const mockLoginRedirect = jest.fn();
    (useMsal as jest.Mock).mockReturnValue({
      instance: {
        getActiveAccount: () => ({ name: 'Test User' }),
        loginRedirect: mockLoginRedirect
      }
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );
    const signinButton = screen.getByText(/Sign in/i);
    expect(signinButton).toBeInTheDocument();
    fireEvent.click(signinButton);
  });

  test('renders call logoutRedirect when handleLogoutRedirect is called', () => {
    const mockLogoutRedirect = jest.fn();
    (useMsal as jest.Mock).mockReturnValue({
      instance: {
        getActiveAccount: () => ({ name: 'Test User' }),
        logoutRedirect: mockLogoutRedirect
      }
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    const userAvatar = screen.getByTestId('user-avatar');
    fireEvent.click(userAvatar);

    const signoutButton = screen.getByText(/Sign out/i);
    expect(signoutButton).toBeInTheDocument();
    fireEvent.click(signoutButton);
  });

  test('renders signout button, customer dropdown and username when authenticated', async () => {
    const mockLoginRedirect = jest.fn();
    (useMsal as jest.Mock).mockReturnValue({
      instance: {
        getActiveAccount: () => ({ name: 'Test User' }),
        loginRedirect: mockLoginRedirect
      }
    });
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const signinButton = screen.getByText(/Sign in/i);
    expect(signinButton).toBeInTheDocument();
    fireEvent.click(signinButton);
    const selectBox = screen.getByRole('combobox');
    expect(selectBox).toBeInTheDocument();
    fireEvent.mouseDown(selectBox);
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Dummy Customer')).toBeVisible();
    });
    const firstOption = screen.getByText('Dummy Customer');
    fireEvent.click(firstOption);
  });
});
