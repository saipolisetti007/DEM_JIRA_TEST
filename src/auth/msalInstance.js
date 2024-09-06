import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

export const getAccessToken = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) return null;
  let token = sessionStorage.getItem('accessToken');
  let expiration = sessionStorage.getItem('accessTokenExpiration');

  if (!token || new Date(expiration) <= new Date()) {
    try {
      let response = await msalInstance.acquireTokenSilent({
        scopes: [],
        account: account
      });
      token = response.accessToken;
      expiration = response.expiresOn;
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('accessTokenExpiration', expiration);
    } catch (error) {
      console.log('Error Acquiring token', error);
      return null;
    }
  }
  return token;
};

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const { account } = event.payload;
    msalInstance.setActiveAccount(account);
  }
});

export default msalInstance;
