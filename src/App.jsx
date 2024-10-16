import { useState, useEffect } from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import msalInstance, { getAccessToken } from './auth/msalInstance';
import DefaultPageLoader from './components/Common/DefaultPageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './components/Header/userProfileSlice';
import { fetchCountries } from './components/PromoGrid/countryCodeSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeAccount = msalInstance?.getActiveAccount();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { fetchAttempted } = useSelector((state) => state.userProfileData);

  // Handle redirect promise and set authentication state
  useEffect(() => {
    msalInstance.handleRedirectPromise().then(() => {
      setIsAuthenticated(true);
      getAccessToken();
      if (location.pathname === '/signin') {
        navigate('/');
      }
    });
  }, [navigate]);

  // Fetch user profile and countries data if active account exists
  useEffect(() => {
    if (activeAccount && !fetchAttempted) {
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
      const countriesData = JSON.parse(sessionStorage.getItem('countriesData'));
      // Fetch countries data if not present in session storage
      if (!countriesData) {
        dispatch(fetchCountries());
      }
      // Fetch user profile data if not present in session storage
      if (!storedUserData) {
        setIsAuthenticated(false);
        dispatch(fetchUserProfile()).then((response) => {
          if (response.error) {
            setIsAuthenticated(false);
            navigate('/unauthorised'); // Ensure user stays on redirectpage
          } else {
            setIsAuthenticated(true);
          }
        });
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [activeAccount, dispatch, fetchAttempted]);

  // Show loader if not authenticated
  if (!isAuthenticated && !fetchAttempted) {
    return <DefaultPageLoader />;
  }
  const hideHeaderFooter = location.pathname === '/unauthorised' || location.pathname === '/signin';
  // Render the main application layout
  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <PageLayout hideHeaderFooter={hideHeaderFooter}>
          <Outlet />
        </PageLayout>
      </AuthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
