import React from 'react';
import { render, screen, act, waitFor, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import EditEventForm from './EditEventForm';
import { updateRowData } from '../../api/promoGridApi';
jest.mock('../../api/promoGridApi');
const initialState = {
  userProfileData: {
    customers: [{ id: 1, name: '2000038335' }],
    userData: null,
    status: 'idle',
    error: null,
    customerId: null,
    fetchAttempted: false
  },
  countriesData: {
    countriesData: ['US', 'AE'],
    isLoading: false,
    error: null
  },
  eventsData: {
    eventsData: {
      MVM: ['Single Item Discount', 'Future Value'],
      BSE: ['Single Item Discount', 'Future Value']
    },
    eventTypeOptions: ['MVM', 'BSE'],
    isLoading: false,
    error: null
  },
  settingsData: {
    settings: {
      start_of_shipments: true,
      end_of_shipments: true,
      event_description: true,
      umbrella_event: true,
      comments: true,
      expected_shipments_forecast: true,
      expected_consumption_forecast: true,
      bu: true,
      proxy_like_item_number: true,
      pgp_flag: true,
      promoted_product_group_id: true,
      distribution_profile: true,
      discount_amt: true,
      base_price: true,
      price_after_discount: true,
      status: true,
      event_string_property_1: true,
      event_string_property_2: true,
      event_string_property_3: true,
      event_string_property_4: true,
      event_string_property_5: true,
      event_num_property_1: true,
      event_num_property_2: true,
      event_num_property_3: true,
      event_num_property_4: true,
      event_num_property_5: true,
      offer_type: true,
      off: true,
      limit: true,
      tpr: true,
      off_2: true,
      gc_buy: true,
      gc_save: true,
      percentage: true
    },
    isLoading: false,
    error: null
  }
};
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('Edit Event Form Component', () => {
  const mockData = {
    golden_customer_id: 2000038335,
    event_type: 'MVM',
    event_subtype: 'Single Item Discount',
    event_sales_channel: 'Store',
    event_description: 'Test',
    item_type: 'EDA',
    product_id: '37000806950',
    id_type: 'GTIN',
    customer_item_number: 660968,
    country_code: 'US',
    event_in_store_start_date: '03/29/2024',
    event_in_store_end_date: '03/30/2024',
    event_publish_to_demand: true
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={() => {}} />
        </Provider>
      );
    });

    expect(screen.getByText('Event Main Parameters')).toBeInTheDocument();
    expect(screen.getByText('Event Additional Data')).toBeInTheDocument();
    expect(screen.getByText('Event Properties')).toBeInTheDocument();
  });

  test('should handle form submission correctly', async () => {
    (updateRowData as jest.Mock).mockResolvedValueOnce({});
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(screen.getByLabelText(/Event description/i), {
      target: { value: mockData.event_description }
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/24/2024' }
    });

    fireEvent.click(screen.getByText('Save changes'));
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
  test('should handle form errors correctly', async () => {
    const errorResponse = {
      response: {
        data: {
          errors: [{ field: 'name', error: 'Name is required' }]
        }
      }
    };

    (updateRowData as jest.Mock).mockRejectedValueOnce(errorResponse);

    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/24/2024' }
    });

    fireEvent.click(screen.getByText('Save changes'));

    await waitFor(() => {
      expect(screen.getByText('Please fix errors in and try to save again')).toBeInTheDocument();
    });
    const snackbar = screen.getByTestId('snackbar');
    const closeIcon = within(snackbar).getByTestId('CloseIcon');

    fireEvent.click(closeIcon);
  });
  test('handles accordion panel change', async () => {
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText('Event Main Parameters'));
    const accordionDiv = screen.getByTestId('panel1');

    expect(accordionDiv).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByText('Event Main Parameters'));
    expect(accordionDiv).toHaveAttribute('aria-expanded', 'true');
  });
  test('should handle form Warnings correctly', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [{ field: 'name', warning: 'Name is required' }]
        }
      }
    };

    (updateRowData as jest.Mock).mockRejectedValueOnce(warningResponse);

    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/24/2024' }
    });

    fireEvent.click(screen.getByText('Save changes'));

    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Proceed to Submit'));
  });
  test('should handle form Warnings and show catch error', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [{ field: 'name', warning: 'Name is required' }]
        }
      }
    };
    const errorResponse = new Error('network Error');
    (updateRowData as jest.Mock)
      .mockRejectedValueOnce(warningResponse)
      .mockRejectedValueOnce(errorResponse);
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/24/2024' }
    });

    fireEvent.click(screen.getByText('Save changes'));

    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Proceed to Submit'));
    await waitFor(() => {
      expect(screen.getByText(/Error occurred while updating the data/i)).toBeInTheDocument();
    });
  });

  test('should close warning dailog on cancel', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [{ field: 'name', warning: 'Name is required' }]
        }
      }
    };
    (updateRowData as jest.Mock).mockRejectedValueOnce(warningResponse);
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });

    fireEvent.change(event_in_store_start_date, {
      target: { value: '07/22/2024' }
    });

    fireEvent.change(event_in_store_end_date, {
      target: { value: '07/24/2024' }
    });

    fireEvent.click(screen.getByText('Save changes'));

    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    const modal = screen.getByRole('dialog');
    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    fireEvent.click(within(modal).getByText('Return to PromoGrid'));

    await waitFor(() => {
      expect(
        screen.queryByText(/There are warnings in the form submission/i)
      ).not.toBeInTheDocument();
    });
  });

  test('customer item number not found warning', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [
            {
              field: 'customer_item_number',
              warning:
                'Customer and Proxy Like Item Number not found. Cold Start Logic will be used'
            }
          ]
        }
      }
    };
    (updateRowData as jest.Mock).mockRejectedValueOnce(warningResponse);
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <EditEventForm rowData={mockData} handleClose={handleClose} />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText('Event Additional Data'));
    const accordionDiv = screen.getByTestId('panel2');
    expect(accordionDiv).toHaveAttribute('aria-expanded', 'true');
    const customer_item_number = screen.getByRole('textbox', {
      name: /Customer item number/i
    });
    fireEvent.change(customer_item_number, {
      target: { value: '6609610' }
    });

    fireEvent.click(screen.getByText('Save changes'));
  });
});
