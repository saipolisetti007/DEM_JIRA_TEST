// @ts-nocheck
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
// Create an instance of PublicClientApplication with the provided configuration
const msalInstance = new PublicClientApplication(msalConfig);
// Initialize the MSAL instance
msalInstance.initialize();

// Function to get the access token
export const getAccessToken = async () => {
  // Get the active account from the MSAL instance
  const account = msalInstance.getActiveAccount();
  if (!account) return null;

  // Retrieve token and expiration from session storage
  let token = sessionStorage.getItem('accessToken');
  let expiration = sessionStorage.getItem('accessTokenExpiration');

  // Check if token is missing or expired
  if (!token || !expiration || new Date(expiration) <= new Date()) {
    try {
      // Acquire a new token silently
      let response = await msalInstance.acquireTokenSilent({
        scopes: [],
        account: account
      });
      token = response.accessToken;
      expiration = response.expiresOn;

      // Store the new token and expiration in session storage
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('accessTokenExpiration', expiration);
    } catch (error) {
      console.log('Error Acquiring token', error);
      return null;
    }
  }
  return token;
};

// Set the active account if there is no active account but there are accounts available
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

// Add an event callback to handle login success events
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const { account } = event.payload;
    msalInstance.setActiveAccount(account);
  }
});

export default msalInstance;
