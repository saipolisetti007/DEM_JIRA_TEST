import React, { useState, useEffect } from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import msalInstance, { getAccessToken } from './auth/msalInstance';
import DefaultPageLoader from './components/Common/DefaultPageLoader';
import { fetchUserProfile } from './components/Header/userProfileSlice';
import { fetchCountries } from './components/PromoGrid/countryCodeSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeAccount = msalInstance?.getActiveAccount();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserProfileCalled, setIsUserProfileCalled] = useState(false);

  const { fetchAttempted } = useAppSelector((state) => state.userProfileData);

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

  const setStoreData = async () => {
    if (activeAccount && !fetchAttempted) {
      const storedUserData = await JSON.parse(sessionStorage.getItem('userData') || 'null');
      const countriesData = await JSON.parse(sessionStorage.getItem('countriesData') || 'null');
      // Fetch countries data if not present in session storage
      if (!countriesData) {
        await dispatch(fetchCountries());
      }
      // Fetch user profile data if not present in session storage
      if (!storedUserData && !isUserProfileCalled) {
        setIsUserProfileCalled(true);
        setIsAuthenticated(false);
        await dispatch(fetchUserProfile()).then((response) => {
          // @ts-ignore
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
  };
  // Fetch user profile and countries data if active account exists
  useEffect(() => {
    setStoreData();
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
