import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import msalInstance, { getAccessToken } from './auth/msalInstance';
import { useEffect, useState } from 'react';
import DefaultPageLoader from './components/Common/DefaultPageLoader';

const App = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    msalInstance.handleRedirectPromise().then(() => {
      setIsAuthenticated(true);
      getAccessToken();
      navigate('/');
    });
  }, [navigate]);

  if (!isAuthenticated) {
    return <DefaultPageLoader />;
  }

  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </AuthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
