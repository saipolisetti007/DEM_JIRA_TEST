import { render } from '@testing-library/react';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
jest.mock('@azure/msal-react');
const msalInstance = {
  getActiveAccount: jest.fn(),
  getLogger: jest.fn()
};

describe('App Component', () => {
  test('renders App component', () => {
    render(
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    );
  });
});
