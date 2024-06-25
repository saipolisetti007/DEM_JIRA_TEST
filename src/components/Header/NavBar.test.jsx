import { fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Provider } from 'react-redux';
import store from '../../store/store';
jest.mock('@azure/msal-react');

describe('NavBar component', () => {
  const mockInstance = {
    getActiveAccount: jest.fn(() => ({ name: 'Test User' })),
    loginRedirect: jest.fn(),
    logoutRedirect: jest.fn()
  };

  beforeEach(() => {
    AuthenticatedTemplate.mockImplementation(({ children }) => <div>{children}</div>);
    UnauthenticatedTemplate.mockImplementation(({ children }) => <div>{children}</div>);
    jest.clearAllMocks();
  });

  test('renders signin button when not authenticated', () => {
    useMsal.mockReturnValueOnce({ instance: null });
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const signinButton = screen.getByText(/Sign In/i);
    expect(signinButton).toBeInTheDocument();
  });

  test('renders signout button and username when authenticated', () => {
    useMsal.mockReturnValue({ instance: mockInstance });
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const signoutButton = screen.getByText(/Sign out/i);
    expect(signoutButton).toBeInTheDocument();
  });

  test('renders call loginRedirect when handleLoginRedirect is called', () => {
    const mockLoginRedirect = jest.fn();
    useMsal.mockReturnValue({
      instance: {
        getActiveAccount: () => ({ name: 'Test User' }),
        loginRedirect: mockLoginRedirect
      }
    });
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const signinButton = screen.getByText(/Sign in/i);
    expect(signinButton).toBeInTheDocument();
    fireEvent.click(signinButton);
  });

  test('renders call loginRedirect when handleLoginRedirect is called', () => {
    const mockLogoutRedirect = jest.fn();
    useMsal.mockReturnValue({
      instance: {
        getActiveAccount: () => ({ name: 'Test User' }),
        logoutRedirect: mockLogoutRedirect
      }
    });
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    const signoutButton = screen.getByText(/Sign out/i);
    expect(signoutButton).toBeInTheDocument();
    fireEvent.click(signoutButton);
  });
});
