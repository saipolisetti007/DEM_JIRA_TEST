import { screen, render, waitFor, act, fireEvent } from '@testing-library/react';
import CPFForecast from './CPFForecast';
import { cpfDecisionAction, cpfGetData } from '../../api/cpfForecastApi';
import React from 'react';
jest.mock('../../api/cpfForecastApi');

describe('CPFForecast', () => {
  beforeEach(() => {
    cpfGetData.mockResolvedValue([]);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () => render(<CPFForecast />));
  });

  test('should fetch and render data', async () => {
    const mockData = [{ id: 1, product_id: 'product' }];
    cpfGetData.mockResolvedValue(mockData);
    await act(async () => {
      render(<CPFForecast />);
    });
    await waitFor(() => {
      expect(cpfGetData).toHaveBeenCalledTimes(1);
      expect(screen.getByText('product')).toBeInTheDocument();
    });
  });

  test('should display error message if data fetch fails', async () => {
    cpfGetData.mockRejectedValue(new Error('Failed to fecth data'));
    await act(async () => {
      render(<CPFForecast />);
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error. Could not fetch the data.')).toBeInTheDocument();
    });
  });

  test('Display error message if no selections are made', async () => {
    await act(async () => {
      render(<CPFForecast />);
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Please approve /reject atleast one product')).toBeInTheDocument();
    });
    const closeButton = screen.getByTestId('CloseIcon');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(
        screen.queryByText('Please approve /reject atleast one product')
      ).not.toBeInTheDocument();
    });
  });

  test('calls cpfDecisionAction with selections', async () => {
    const mockData = [{ id: 1, product_id: 'product' }];
    cpfGetData.mockResolvedValue(mockData);

    const mockSelectionData = [{ 1: 'approve' }];
    cpfDecisionAction.mockResolvedValue(mockSelectionData);

    await act(async () => {
      render(<CPFForecast />);
    });

    await waitFor(() => {
      expect(cpfGetData).toHaveBeenCalledTimes(1);
    });
    const approveButton = screen.getByRole('button', { name: /Approve/i });
    fireEvent.click(approveButton);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(cpfDecisionAction).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Data Submitted successfully !!!')).toBeInTheDocument();
    });
  });

  test('show error message cpfDecisionAction fails', async () => {
    const mockData = [{ id: 1, product_id: 'product' }];
    cpfGetData.mockResolvedValue(mockData);
    cpfDecisionAction.mockRejectedValue();

    await act(async () => {
      render(<CPFForecast />);
    });
    await waitFor(() => {
      expect(cpfGetData).toHaveBeenCalledTimes(1);
    });
    const approveButton = screen.getByRole('button', { name: /Approve/i });
    fireEvent.click(approveButton);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(cpfDecisionAction).toHaveBeenCalled();
      expect(screen.getByText('Error occured ! Please submit again !!!')).toBeInTheDocument();
    });
  });
});
