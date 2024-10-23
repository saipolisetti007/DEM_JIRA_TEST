import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './PageLayout';
import { Provider } from 'react-redux';
import rootReducer from '../../store/reducers';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import store from '../../store/store';

describe('PageLayout Component', () => {
  test('renders header footer component', () => {
    // Mock store
    const initialState = {
      userProfileData: {
        customerId: '2000038335',
        userData: null,
        status: 'idle',
        error: null,
        fetchAttempted: false
      }
    };
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <div>Test Child</div>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
  test('renders default page loader', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <div>Test Child</div>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    );
  });
});
