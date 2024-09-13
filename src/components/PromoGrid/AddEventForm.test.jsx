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
  countriesData: {
    countriesData: ['US', 'AE']
  },
  eventsData: {
    eventsData: {
      MVM: ['Single Item Discount', 'Future Value'],
      BSE: ['Single Item Discount', 'Future Value']
    },
    eventTypeOptions: ['MVM', 'BSE']
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
    }
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
    event_description: 'Test',
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
    });
    await waitFor(() => {
      const itemTypeOption = screen.getByRole('listbox', {
        name: /Item type/i
      });
      fireEvent.click(within(itemTypeOption).getByText(mockData.item_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
    });

    await act(async () => {
      const idType = screen.getByLabelText(/ID Type/i);
      fireEvent.mouseDown(idType);
    });
    await waitFor(() => {
      const idTypeOption = screen.getByRole('listbox', {
        name: /ID Type/i
      });
      fireEvent.click(within(idTypeOption).getByText(mockData.id_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
    });
    await act(async () => {
      const countryCode = screen.getByLabelText(/Country Code/i);
      fireEvent.mouseDown(countryCode);
    });
    await waitFor(() => {
      const countryCodeOption = screen.getByRole('listbox', {
        name: /Country Code/i
      });
      expect(countryCodeOption).toBeInTheDocument();
      fireEvent.click(within(countryCodeOption).getByText(mockData.country_code));
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
    });
    await waitFor(() => {
      const itemTypeOption = screen.getByRole('listbox', {
        name: /Item type/i
      });
      fireEvent.click(within(itemTypeOption).getByText(mockData.item_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
    });

    await act(async () => {
      const idType = screen.getByLabelText(/ID Type/i);
      fireEvent.mouseDown(idType);
    });
    await waitFor(() => {
      const idTypeOption = screen.getByRole('listbox', {
        name: /ID Type/i
      });
      fireEvent.click(within(idTypeOption).getByText(mockData.id_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
    });
    await act(async () => {
      const countryCode = screen.getByLabelText(/Country Code/i);
      fireEvent.mouseDown(countryCode);
    });
    await waitFor(() => {
      const countryCodeOption = screen.getByRole('listbox', {
        name: /Country Code/i
      });
      fireEvent.click(within(countryCodeOption).getByText(mockData.country_code));
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
  test('updates stepErrors correctly on validation failure', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <AddEventForm handleClose={() => {}} />
        </Provider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await waitFor(() => {
      expect(screen.getByText('Event Main Parameters')).toHaveClass('Mui-error');
    });
  });
  test('changes active step correctly on step label click', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <AddEventForm handleClose={() => {}} />
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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

    fireEvent.click(screen.getByText('Event Additional Data'));

    await waitFor(() => {
      expect(screen.getByText('Event Additional Data')).toHaveClass('Mui-active');
    });
  });
  test('should handle form Warnings correctly', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [
            {
              field: 'Event in store end date',
              warning: 'event end date should be within 365 days of start date'
            },
            {
              field: 'customer_item_number',
              warning: 'Customer and Proxy Like Item Number not found. Cold Start Logic will be used'
            },
          ]
        }
      }
    };
    addNewRowData.mockRejectedValueOnce(warningResponse);
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
    });
    await waitFor(() => {
      const itemTypeOption = screen.getByRole('listbox', {
        name: /Item type/i
      });
      fireEvent.click(within(itemTypeOption).getByText(mockData.item_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
    });

    await act(async () => {
      const idType = screen.getByLabelText(/ID Type/i);
      fireEvent.mouseDown(idType);
    });
    await waitFor(() => {
      const idTypeOption = screen.getByRole('listbox', {
        name: /ID Type/i
      });
      fireEvent.click(within(idTypeOption).getByText(mockData.id_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
    });
    await act(async () => {
      const countryCode = screen.getByLabelText(/Country Code/i);
      fireEvent.mouseDown(countryCode);
    });
    await waitFor(() => {
      const countryCodeOption = screen.getByRole('listbox', {
        name: /Country Code/i
      });
      fireEvent.click(within(countryCodeOption).getByText(mockData.country_code));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
    });
    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Proceed to Submit'));
  });
  test('should handle form Warnings and show catch error', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [
            {
              field: 'Event in store end date',
              warning: 'event end date should be within 365 days of start date'
            },
            {
              field: 'customer_item_number',
              warning: 'Customer and Proxy Like Item Number not found. Cold Start Logic will be used'
            },
            {
              field: 'proxy_like_item_number',
              warning: 'Customer and Proxy Like Item Number not found. Cold Start Logic will be used'
            }
          ]
        }
      }
    };
    const errorResponse = new Error('network Error');
    addNewRowData.mockRejectedValueOnce(warningResponse).mockRejectedValueOnce(errorResponse);
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
    });
    await waitFor(() => {
      const itemTypeOption = screen.getByRole('listbox', {
        name: /Item type/i
      });
      fireEvent.click(within(itemTypeOption).getByText(mockData.item_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
    });

    await act(async () => {
      const idType = screen.getByLabelText(/ID Type/i);
      fireEvent.mouseDown(idType);
    });
    await waitFor(() => {
      const idTypeOption = screen.getByRole('listbox', {
        name: /ID Type/i
      });
      fireEvent.click(within(idTypeOption).getByText(mockData.id_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
    });
    await act(async () => {
      const countryCode = screen.getByLabelText(/Country Code/i);
      fireEvent.mouseDown(countryCode);
    });
    await waitFor(() => {
      const countryCodeOption = screen.getByRole('listbox', {
        name: /Country Code/i
      });
      fireEvent.click(within(countryCodeOption).getByText(mockData.country_code));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
    });
    await waitFor(() => {
      expect(screen.getByText(/There are warnings in the form submission/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Proceed to Submit'));

    await waitFor(() => {
      expect(screen.getByText(/Error Occurred while updating the data/i)).toBeInTheDocument();
    });
  });

  test('should close warning dailog on cancel', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [
            {
              field: 'Event in store end date',
              warning: 'event end date should be within 365 days of start date'
            }
          ]
        }
      }
    };
    addNewRowData.mockRejectedValueOnce(warningResponse);
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
      fireEvent.change(screen.getByLabelText(/Event description/i), {
        target: { value: mockData.event_description }
      });
    });

    await act(async () => {
      const eventSalesChannel = screen.getByLabelText(/event sales channel/i);
      fireEvent.mouseDown(eventSalesChannel);
    });

    await waitFor(() => {
      const eventSalesChannelOption = screen.getByRole('listbox', {
        name: /event sales channel/i
      });
      fireEvent.click(within(eventSalesChannelOption).getByText(mockData.event_sales_channel));
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
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
    });
    await waitFor(() => {
      const itemTypeOption = screen.getByRole('listbox', {
        name: /Item type/i
      });
      fireEvent.click(within(itemTypeOption).getByText(mockData.item_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Product ID/i), {
        target: { value: mockData.product_id }
      });
    });

    await act(async () => {
      const idType = screen.getByLabelText(/ID Type/i);
      fireEvent.mouseDown(idType);
    });
    await waitFor(() => {
      const idTypeOption = screen.getByRole('listbox', {
        name: /ID Type/i
      });
      fireEvent.click(within(idTypeOption).getByText(mockData.id_type));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Customer item Number/i), {
        target: { value: mockData.customer_item_number }
      });
    });
    await act(async () => {
      const countryCode = screen.getByLabelText(/Country Code/i);
      fireEvent.mouseDown(countryCode);
    });
    await waitFor(() => {
      const countryCodeOption = screen.getByRole('listbox', {
        name: /Country Code/i
      });
      fireEvent.click(within(countryCodeOption).getByText(mockData.country_code));
    });
    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
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
});
