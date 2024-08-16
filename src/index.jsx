import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './customTheme';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import ErrorBoundary from './errorHanlding/ErrorBoundary';
import SignIn from './components/SignIn/SignIn';
import PromoGrid from './pages/PromoGrid';
import CPFForecast from './pages/CPFForecast';
import PromoGridValidations from './components/PromoGrid/PromoGridValidations';
import StoreToDcMapping from './pages/StoreToDcMapping';
import ThresholdSettings from './pages/ThresholdSettings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/store-to-dc-mapping" element={<StoreToDcMapping />} />
      <Route path="/promo-grid" element={<PromoGrid />} />
      <Route path="/promo-grid-validations" element={<PromoGridValidations />} />
      <Route path="/cpf-forecast" element={<CPFForecast />} />
      <Route path="/threshold-settings" element={<ThresholdSettings />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
