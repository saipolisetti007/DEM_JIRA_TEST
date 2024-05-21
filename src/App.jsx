import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import msalInstance, { getAccessToken } from './auth/msalInstance';
import { useEffect } from 'react';
const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  return (
    <>
      <AuthenticatedTemplate>{activeAccount ? <Outlet /> : null}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </>
  );
};

const App = ({ instance }) => {
  useEffect(() => {
    msalInstance.handleRedirectPromise().then(() => {
      getAccessToken();
    });
  }, []);
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <MainContent />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
