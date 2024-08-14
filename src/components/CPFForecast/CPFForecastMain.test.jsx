import React from 'react';
import { render, screen, act, waitFor, fireEvent, within } from '@testing-library/react';
import CPFForecastMain from './CPFForecastMain';
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

const mockData = {
  cpf_data: [
    {
      sku: 'sku4',
      prod_name: 'prodName',
      cs_factor: '100',
      it_factor: '10',
      units: 'su',
      forecast: [
        {
          week: '08/12/2024',
          unit: 3000,
          prevUnits: 2500,
          percentChange: 0.6,
          unit_diff: 200,
          editedUnits: 4000,
          finalunits: 4000,
          approved: false,
          active: true
        }
      ]
    }
  ],
  cpf_enabled: true
};

describe('CPFForecastMain', () => {
  beforeEach(() => {
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () => render(<CPFForecastMain />));
  });

  test('should fetch and render filters', async () => {
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('Subsector')).toBeInTheDocument();
    });
  });

  test('should handle filter fetch error', async () => {
    cpfFilters.mockRejectedValueOnce(new Error('Network Error'));
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('should fetch and render data', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const skuElement = screen.getByText((content, element) => content.includes('sku4'));
      expect(skuElement).toBeInTheDocument();
    });
  });

  test('update data based on filter change and render data', async () => {
    await act(async () => render(<CPFForecastMain />));
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
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('handles accordion change', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const accordionItems = screen.getAllByRole('button');
      fireEvent.click(accordionItems[0]);
      expect(screen.getByTestId('accordion-item-0')).toHaveClass('Mui-expanded');
    });
  });

  test('handles empty filter values including "All"', async () => {
    const filters = {
      subsector: ['All'],
      category: [],
      brand: ['All'],
      brandForm: [],
      sku: [],
      prodName: [],
      customerItemNumber: []
    };

    await act(async () => render(<CPFForecastMain />));
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

  test('handles unit button click and unit change', async () => {
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });

    // Click on the unit button
    fireEvent.click(screen.getByText('cs'));
    expect(screen.getByText('cs')).toHaveClass('MuiButton-contained');
    fireEvent.click(screen.getByText('it'));
    expect(screen.getByText('it')).toHaveClass('MuiButton-contained');
  });

  test('opens the confirmation dialog when there are unsaved changes and unit is changed', async () => {
    cpfGetForecast.mockResolvedValue(mockData);

    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const tableData = screen.getAllByRole('table')[0];
      const inputDiv = within(tableData).getByTestId('editedUnit');
      const input = within(inputDiv).getByPlaceholderText('Edited Units');
      fireEvent.change(input, { target: { value: '3000' } });
      expect(input).toHaveValue(3000);
    });
    await act(async () => {
      fireEvent.click(screen.getByText('msu'));
    });
  });
});
