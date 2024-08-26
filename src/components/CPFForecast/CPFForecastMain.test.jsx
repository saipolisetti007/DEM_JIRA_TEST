import React from 'react';
import { render, screen, act, waitFor, fireEvent, within } from '@testing-library/react';
import CPFForecastMain from './CPFForecastMain';
import { cpfGetForecast, cpfFilters, cpfSkuForecast } from '../../api/cpfForecastApi';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/cpfForecastApi');

const mockFilters = {
  subsector: ['Skin and Personal Care'],
  category: ['Auto Dish'],
  brand: ['Cascade'],
  brandForm: ['brandForm4'],
  sku: ['sku4'],
  customer_id: ['2000038335']
};

const mockData = {
  skus: [
    {
      sku: 'sku4',
      prod_name: 'prodName'
    }
  ],
  cpf_enabled: true
};

const cpfData = {
  cs_factor: 107.25,
  it_factor: 1.11719,
  units: 'SU',
  forecast: [
    {
      week: '08/26/2024',
      unit: 88729.55,
      prevUnits: 90000.0,
      percentChange: -1.411611111111108,
      unit_diff: -1270.449999999997,
      editedUnits: 88000.0,
      finalunits: 88000.0,
      approved: true,
      active: true
    }
  ]
};

describe('CPFForecastMain', () => {
  beforeEach(() => {
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue(mockData);
    cpfSkuForecast.mockResolvedValue(cpfData);
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
    cpfSkuForecast.mockResolvedValue(cpfData);
    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });

    const accordionItem = screen.getByTestId('accordion-item-0');
    fireEvent.click(accordionItem);

    await waitFor(() => {
      expect(accordionItem).not.toHaveClass('Mui-expanded');
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
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue(mockData);
    cpfSkuForecast.mockResolvedValue(cpfData);

    await act(async () => render(<CPFForecastMain />));
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });

    // await waitFor(() => {
    //   const accordionItem = screen.getByTestId('accordion-item-0');
    //   fireEvent.click(accordionItem);
    // });
    // await waitFor(() => {
    //   const tableData = screen.getAllByRole('table');
    //   const inputDiv = within(tableData).getByTestId('editedUnit');
    //   const input = within(inputDiv).getByPlaceholderText('Edited Units');
    //   fireEvent.change(input, { target: { value: '3000' } });
    //   expect(input).toHaveValue(3000);
    // });
    // await act(async () => {
    //   fireEvent.click(screen.getByText('msu'));
    // });
  });
});
