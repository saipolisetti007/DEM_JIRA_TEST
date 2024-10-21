type msalConfigType = {
  auth: {
    clientId: string | undefined;
    authority: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
    navigateToLoginRequestUrl: boolean;
  };
  cache: {
    cacheLocation: string;
    storeAuthStateInCookie: boolean;
  };
};
// Configuration object for MSAL (Microsoft Authentication Library)
export const msalConfig: msalConfigType = {
  auth: {
    // Client ID of the application, retrieved from environment variables
    clientId: process.env.REACT_APP_CLIENT_ID,
    // Authority URL for the tenant, constructed using the tenant ID from environment variables
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    // URL to redirect to after login
    redirectUri: '/',
    // URL to redirect to after logout
    postLogoutRedirectUri: '/',
    // Whether to navigate to the original request URL after login
    navigateToLoginRequestUrl: false
  },
  cache: {
    // Location to store the cache, can be 'localStorage' or 'sessionStorage'
    cacheLocation: 'sessionStorage',
    // Whether to store authentication state in cookies
    storeAuthStateInCookie: false
  }
};

// Request object for login, specifying the scopes required
export const loginRequest: { scopes: string[] } = {
  scopes: ['user.read']
};

// Request object for silent token acquisition, specifying the scopes and login hint
export const silentRequest: { scopes: string[]; loginHint: string } = {
  scopes: ['openid', 'profile'],
  loginHint: 'example@domain.net'
};
