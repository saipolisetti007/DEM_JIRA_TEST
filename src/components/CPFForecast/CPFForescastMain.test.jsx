import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import CPFForescastMain from './CPFForescastMain';
import { cpfGetForecast, cpfFilters } from '../../api/cpfForecastApi';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/cpfForecastApi');

const mockFilters = {
  subsector: ['Skin and Personal Care'],
  category: ['Auto Dish'],
  brand: ['Cascade'],
  brandForm: ['brandForm4'],
  sku: ['sku4']
};

const mockData = [
  {
    sku: 'sku4',
    forecast: [
      {
        week: '03/06/24',
        unit: '2850',
        active: true,
        approved: false
      }
    ]
  }
];

describe('CPFForecastMain', () => {
  beforeEach(() => {
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () => render(<CPFForescastMain />));
  });

  test('should fetch and render filters', async () => {
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('Subsector')).toBeInTheDocument();
    });
  });

  test('should handle filter fetch error', async () => {
    cpfFilters.mockRejectedValueOnce(new Error('Network Error'));
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        screen.getByText((content, element) => content.includes('Network Error !!!'))
      ).toBeInTheDocument();
    });
  });

  test('should fetch and render data', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('sku4'))).toBeInTheDocument();
    });
  });

  test('update data based on filter change and render data', async () => {
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });

    const filterSelect = screen.getByLabelText('Brand');
    expect(filterSelect).toBeInTheDocument();

    await act(async () => {
      userEvent.click(filterSelect);
    });

    const options = await screen.findAllByRole('option');

    await act(async () => {
      fireEvent.click(options[1]);
    });

    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
  });

  test('should handle fetch error', async () => {
    cpfGetForecast.mockRejectedValueOnce(new Error('Network Error'));
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        screen.getByText((content, element) => content.includes('Network Error !!!'))
      ).toBeInTheDocument();
    });
  });
});
