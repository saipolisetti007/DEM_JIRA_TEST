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

import StoreToDcMapping from './pages/StoreToDcMapping';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import ErrorBoundary from './errorHanlding/ErrorBoundary';
import PromoGrid from './pages/PromoGrid';
import CPFForecast from './components/CPFForecast/CPFForecast';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/store-to-dc-mapping" element={<StoreToDcMapping />} />
      <Route path="/promo-grid" element={<PromoGrid />} />
      <Route path="/cpf-forecast" element={<CPFForecast />} />
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
