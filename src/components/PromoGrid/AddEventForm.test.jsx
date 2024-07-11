import React from 'react';
import { render, screen, act, waitFor, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';
import AddEventForm from './AddEventForm';
import { addNewRowData } from '../../api/promoGridApi';

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
          <AddEventForm handleClose={() => {}} />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Event Main Parameters')).toBeInTheDocument();
      expect(screen.getByText('Event Additional Data')).toBeInTheDocument();
      expect(screen.getByText('Event Properties')).toBeInTheDocument();
    });
  });

  test('should handle form submission correctly', async () => {
    addNewRowData.mockResolvedValueOnce({});
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <AddEventForm handleClose={handleClose} />
        </Provider>
      );
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Event in store start date/i), {
        target: { value: mockData.event_in_store_start_date }
      });
      fireEvent.change(screen.getByLabelText(/Event in store end date/i), {
        target: { value: mockData.event_in_store_end_date }
      });
      fireEvent.change(screen.getByLabelText(/event sales channel/i), {
        target: { value: mockData.event_sales_channel }
      });
    });

    await act(async () => {
      const eventType = screen.getByLabelText(/event type/i);
      fireEvent.mouseDown(eventType);
    });

    await waitFor(() => {
      const typeOption = screen.getByRole('listbox', { name: /event type/i });
      fireEvent.click(within(typeOption).getByText(/MVM/i));
    });

    await act(async () => {
      const eventSubtype = screen.getByLabelText(/event subtype/i);
      fireEvent.mouseDown(eventSubtype);
    });

    await waitFor(() => {
      const typeSubOption = screen.getByRole('listbox', { name: /event subtype/i });
      fireEvent.click(within(typeSubOption).getByText(/Single Item Discount/i));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Item type/i), {
        target: { value: mockData.item_type }
      });
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
      fireEvent.change(screen.getByLabelText(/ID Type/i), {
        target: { value: mockData.id_type }
      });
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
      fireEvent.change(screen.getByLabelText(/Country Code/i), {
        target: { value: mockData.country_code }
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
    });
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
  test('should handle form errors correctly', async () => {
    const errorResponse = {
      response: {
        data: {
          errors: [
            {
              field: 'Event in store end date',
              error: 'event end date should be within 365 days of start date'
            }
          ]
        }
      }
    };

    addNewRowData.mockRejectedValueOnce(errorResponse);
    const handleClose = jest.fn();
    await act(async () => {
      render(
        <Provider store={store}>
          <AddEventForm handleClose={handleClose} />
        </Provider>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Event in store start date/i), {
        target: { value: mockData.event_in_store_start_date }
      });
      fireEvent.change(screen.getByLabelText(/Event in store end date/i), {
        target: { value: mockData.event_in_store_end_date }
      });
      fireEvent.change(screen.getByLabelText(/event sales channel/i), {
        target: { value: mockData.event_sales_channel }
      });
    });

    await act(async () => {
      const eventType = screen.getByLabelText(/event type/i);
      fireEvent.mouseDown(eventType);
    });

    await waitFor(() => {
      const typeOption = screen.getByRole('listbox', { name: /event type/i });
      fireEvent.click(within(typeOption).getByText(/MVM/i));
    });

    await act(async () => {
      const eventSubtype = screen.getByLabelText(/event subtype/i);
      fireEvent.mouseDown(eventSubtype);
    });

    await waitFor(() => {
      const typeSubOption = screen.getByRole('listbox', { name: /event subtype/i });
      fireEvent.click(within(typeSubOption).getByText(/Single Item Discount/i));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Item type/i), {
        target: { value: mockData.item_type }
      });
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
      fireEvent.change(screen.getByLabelText(/ID Type/i), {
        target: { value: mockData.id_type }
      });
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
      fireEvent.change(screen.getByLabelText(/Country Code/i), {
        target: { value: mockData.country_code }
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('CloseIcon'));
  });
});
