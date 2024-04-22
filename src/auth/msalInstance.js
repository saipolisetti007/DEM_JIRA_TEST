import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

export const getAccessToken = async () => {
  const account = msalInstance.getActiveAccount();
  const accessTokenRequest = {
    scopes: [],
    account: account
  };
  let response = await msalInstance.acquireTokenSilent({
    accessTokenRequest,
    account: account
  });
  return response.accessToken;
};

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export default msalInstance;
