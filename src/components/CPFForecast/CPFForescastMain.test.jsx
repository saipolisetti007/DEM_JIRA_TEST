import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import CPFForescastMain from './CPFForescastMain';
import { cpfGetForecast, cpfFilters } from '../../api/cpfForecastApi';
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
    sku: 'sku',
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

describe('CPFForecast', () => {
  beforeEach(() => {
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () => render(<CPFForescastMain />));
  });

  test('should fetch and render filters', async () => {
    cpfFilters.mockResolvedValue(mockFilters);
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
  });
  test('should filter fetch error', async () => {
    cpfFilters.mockRejectedValueOnce();
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('should fetch and render data', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
  });

  test('update data based on filter change and render data', async () => {
    cpfFilters.mockResolvedValue(mockFilters);
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });

    const filterSelect = screen.getByLabelText('Brand');
    expect(filterSelect).toBeInTheDocument;
  });

  test('should fetch error', async () => {
    cpfGetForecast.mockRejectedValueOnce();
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('handles accordion change', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () => render(<CPFForescastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const accordionItems = screen.getAllByRole('button');
      fireEvent.click(accordionItems[0]);
      expect(screen.getByTestId('accordion-item-0')).not.toHaveClass('Mui-expanded');
    });

    const accordionItems = screen.getAllByRole('button');
    fireEvent.click(accordionItems[0]);
    expect(screen.getByTestId('accordion-item-0')).toHaveClass('Mui-expanded');
  });
});
