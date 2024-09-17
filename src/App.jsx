import { useState, useEffect } from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import msalInstance, { getAccessToken } from './auth/msalInstance';
import SecondaryNavBar from '../src/components/Header/SecondaryNavBar';
import DefaultPageLoader from './components/Common/DefaultPageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './components/Header/userProfileSlice';
import { fetchCountries } from './components/PromoGrid/countryCodeSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeAccount = msalInstance?.getActiveAccount();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userProfile = useSelector((state) => state.userProfileData.userData);
  const countries = useSelector((state) => state.countriesData.countriesData);

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
    if (activeAccount) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      const countriesData = JSON.parse(localStorage.getItem('countriesData'));
      // Fetch countries data if not present or different from the current state
      if (!countriesData || JSON.stringify(countriesData) !== JSON.stringify(countries)) {
        dispatch(fetchCountries());
      }
      // Fetch user profile data if not present or different from the current state
      if (!storedUserData || JSON.stringify(storedUserData) !== JSON.stringify(userProfile)) {
        setIsAuthenticated(false);
        dispatch(fetchUserProfile()).then(() => {
          setIsAuthenticated(true);
        });
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [activeAccount, dispatch, userProfile, countries]);

  // Show loader if not authenticated
  if (!isAuthenticated) {
    return <DefaultPageLoader />;
  }

  // Render the main application layout
  return (
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <PageLayout>
          <SecondaryNavBar />
          <Outlet />
        </PageLayout>
      </AuthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;
