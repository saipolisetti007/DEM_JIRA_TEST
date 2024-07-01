import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import CPFForecast from './CPFForecast';
import { cpfPendingCount } from '../../api/cpfForecastApi';

jest.mock('../../api/cpfForecastApi', () => ({
  cpfPendingCount: jest.fn()
}));

describe('CPFForecast', () => {
  test('should render the component correctly', () => {
    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    expect(screen.getByText('CPF forecast')).toBeInTheDocument();
    expect(screen.getByText('Stay up to date with the shipping forecast')).toBeInTheDocument();
  });

  test('should display loading state initially', () => {
    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should fetch and display data correctly', async () => {
    cpfPendingCount.mockResolvedValueOnce({ pending_approvals_count: 5 });

    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Pending approval: 5')).toBeInTheDocument());
  });

  test('should handle error state correctly', async () => {
    cpfPendingCount.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    // You can add more assertions here based on how you handle the error state in your component
  });

  test('should render NavigationButton components correctly', () => {
    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    expect(screen.getByText('See more')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Loading...' })).toBeInTheDocument();
  });
});
