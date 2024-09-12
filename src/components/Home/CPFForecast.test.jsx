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

    expect(screen.getByText('Pending Approval : ...')).toBeInTheDocument();
  });

  test('should fetch and display data correctly', async () => {
    cpfPendingCount.mockResolvedValueOnce({
      pending_approvals_count: 5,
      missing_count: 3,
      warning_count: 2
    });

    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pending Approval : 5')).toBeInTheDocument();
      expect(screen.getByText('Forecast Warning : 2')).toBeInTheDocument();
      expect(screen.getByText('Forecast Missing : 3')).toBeInTheDocument();
    });
  });

  test('should handle error state correctly', async () => {
    cpfPendingCount.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Pending Approval : ...')).toBeInTheDocument());
  });

  test('should render NavigationButton components correctly', () => {
    render(
      <MemoryRouter>
        <CPFForecast />
      </MemoryRouter>
    );
    // Check if the link with the correct URL and text is present in the document
    const linkElement = screen.getByRole('link', { name: 'Forecast Missing : ...' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/cpf-forecast?status=Forecast Missing');
  });
});
