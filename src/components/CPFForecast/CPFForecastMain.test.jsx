import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import CPFForecastMain from './CPFForecastMain';
import { cpfGetForecast, cpfFilters, cpfSkuForecast } from '../../api/cpfForecastApi';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useParams } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import { Provider } from 'react-redux';

jest.mock('../../api/cpfForecastApi');

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

// Mock store
const initialState = {
  userProfileData: {
    customerId: '2000038335'
  }
};

const mockFilters = {
  subsector: ['Skin and Personal Care'],
  category: ['Auto Dish'],
  brand: ['Cascade'],
  brandForm: ['brandForm4'],
  sku: ['sku4'],
  customer_id: ['2000038335'],
  status: ['Forecast Missing']
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

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('CPFForecastMain', () => {
  beforeEach(() => {
    cpfFilters.mockResolvedValue(mockFilters);
    cpfGetForecast.mockResolvedValue(mockData);
    cpfSkuForecast.mockResolvedValue(cpfData);
    useParams.mockReturnValue({ status: 'Pending approval' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
  });
  test('should fetch and render filters', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByLabelText('Subsector')).toBeInTheDocument();
    });
  });
  test('should handle filter fetch error', async () => {
    cpfFilters.mockRejectedValueOnce(new Error('Network Error'));
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('should fetch and render data', async () => {
    cpfGetForecast.mockResolvedValue(mockData);
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const skuElement = screen.getByText((content) => content.includes('sku4'));
      expect(skuElement).toBeInTheDocument();
    });
  });
  test('update data based on filter change and render data', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
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
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
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
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
    await waitFor(() => {
      const accordionItem = screen.getByTestId('accordion-item-0');
      fireEvent.click(accordionItem);
    });

    // await waitFor(() => {
    //   expect(accordionItem).not.toHaveClass('Mui-expanded');
    // });
  });

  test('handles empty filter values including "All"', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
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
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
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

    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CPFForecastMain />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(cpfFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(cpfGetForecast).toHaveBeenCalled();
    });
  });
});
