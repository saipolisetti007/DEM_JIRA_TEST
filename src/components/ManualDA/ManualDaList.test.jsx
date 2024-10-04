// ManualDaList.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import ManualDaList from './ManualDaList';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../customTheme';

const initialState = {
  userProfileData: {
    userData: {
      region: 'US'
    }
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('ManualDaList Component', () => {
  test('renders without crashing', async () => {
    render(
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <BrowserRouter>
            <ManualDaList />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText('Manual DA')).toBeInTheDocument();
  });
});
