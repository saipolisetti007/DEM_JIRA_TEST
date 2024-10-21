import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import CPFForecast from './CPFForecast';
import { cpfPendingCount } from '../../api/cpfForecastApi';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import { Provider } from 'react-redux';

jest.mock('../../api/cpfForecastApi', () => ({
  cpfPendingCount: jest.fn()
}));
// Mock store
const initialState = {
  userProfileData: {
    customerId: '2000038335',
    userData: null,
    status: 'idle',
    error: null
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('CPFForecast', () => {
  test('should render the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CPFForecast />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('CPF Review')).toBeInTheDocument();
    expect(screen.getByText('Check the forecast for your shipment')).toBeInTheDocument();
  });

  test('should display loading state initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CPFForecast />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Alert : ...')).toBeInTheDocument();
  });

  test('should fetch and display data correctly', async () => {
    (cpfPendingCount as jest.Mock).mockResolvedValueOnce({
      missing_count: 3,
      warning_count: 2
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CPFForecast />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Alert : 2')).toBeInTheDocument();
      expect(screen.getByText('Missing : 3')).toBeInTheDocument();
    });
  });

  test('should handle error state correctly', async () => {
    (cpfPendingCount as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CPFForecast />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText('Alert : ...')).toBeInTheDocument());
  });

  test('should render NavigationButton components correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CPFForecast />
        </MemoryRouter>
      </Provider>
    );
    // Check if the link with the correct URL and text is present in the document
    const linkElement = screen.getByRole('link', { name: 'Missing : ...' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/cpf-forecast?status=Missing');
  });
});
