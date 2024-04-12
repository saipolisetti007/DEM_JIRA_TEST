import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';

const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <main className="flex-grow py-5">
      <AuthenticatedTemplate>{activeAccount ? <Outlet /> : null}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </main>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <MainContent />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;
