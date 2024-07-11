import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import EditEventForm from './EditEventForm';
import { updateRowData } from '../../api/promoGridApi';
jest.mock('../../api/promoGridApi');
const initialState = {
  userProfileData: {
    customers: [{ id: 1, name: '2000038335' }]
  },
  eventsData: {
    eventsData: {
      MVM: ['Single Item Discount', 'Future Value'],
      BSE: ['Single Item Discount', 'Future Value']
    },
    eventTypeOptions: ['MVM', 'BSE']
  }
};
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('Add Event Form Component', () => {
  const mockData = {
    golden_customer_id: 2000038335,
    event_type: 'MVM',
    event_subtype: 'Single Item Discount',
    event_sales_channel: 'Store',
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
    updateRowData.mockResolvedValueOnce({});
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

    updateRowData.mockRejectedValueOnce(errorResponse);

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

    fireEvent.click(screen.getByTestId('CloseIcon'));
  });
});
