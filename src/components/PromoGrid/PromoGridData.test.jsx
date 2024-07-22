import React from 'react';
import { render, screen, act, waitFor, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  cancelRowData,
  downloadDataExcel,
  downloadBlankExcel,
  getData,
  promoGridFilters,
  uploadDataExcel
} from '../../api/promoGridApi';
import PromoGridData from './PromoGridData';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/reducers';

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

const mockData = {
  count: 1,
  results: [
    {
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
    }
  ]
};

const mockFilters = {
  subsector: ['Skin and Personal Care'],
  category: ['Auto Dish'],
  brand: ['Cascade'],
  brandForm: ['brandForm4'],
  sku: ['sku4'],
  prod_name: ['Product1'],
  customer_item_number: ['123456']
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

describe('PromoGridData Component', () => {
  beforeEach(() => {
    promoGridFilters.mockResolvedValue(mockFilters);
    getData.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without crashing', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
  });

  test('should fetch and render filters', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(promoGridFilters).toHaveBeenCalled();
    });
  });

  test('should filter fetch error', async () => {
    promoGridFilters.mockRejectedValueOnce();
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(promoGridFilters).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error !!!')).toBeInTheDocument();
    });
  });

  test('should fetch and render data', async () => {
    getData.mockResolvedValue(mockData);
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(getData).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getData).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        expect.any(Object)
      );
    });
  });

  test('update data based on filter change and render data', async () => {
    promoGridFilters.mockResolvedValue(mockFilters);
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(promoGridFilters).toHaveBeenCalled();
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
      expect(getData).toHaveBeenCalled();
    });
  });

  test('cancels row successfully', async () => {
    cancelRowData.mockResolvedValueOnce({});
    getData.mockResolvedValueOnce(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('MVM')).toBeInTheDocument();
    });

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const cancelButton = await screen.findByLabelText('Cancel Event');

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await act(async () => {
      const confirmButton = screen.getByText('Cancel Event');
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(cancelRowData).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText('Promo Cancelled successfully !!!')).toBeInTheDocument();
    });
  });

  test('handles Excel file upload', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    uploadDataExcel.mockResolvedValueOnce({ data: {} });
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload New Data')).toBeInTheDocument();
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData), expect.any(Object));
    });
  });

  test('handles upload failure', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    uploadDataExcel.mockRejectedValueOnce(new Error('Upload failed'));
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload New Data')).toBeInTheDocument();
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData), expect.any(Object));
    });

    await waitFor(() => {
      expect(screen.getByTestId('snackbar-error')).toHaveTextContent(
        'Error occured while updating the data! Please try again!!!'
      );
    });
  });

  test('handles upload failure based on golden customer id', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const errorResponse = {
      response: {
        status: 403,
        data: {
          error:
            'Uploaded file contains customer without access. You cannot upload a file with this customer ID.'
        }
      }
    };

    uploadDataExcel.mockRejectedValueOnce(errorResponse);
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload New Data')).toBeInTheDocument();
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData), expect.any(Object));
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Uploaded file contains customer without access. You cannot upload a file with this customer ID.'
        )
      ).toBeInTheDocument();
    });
  });

  test('handles successful data Excel file download', async () => {
    downloadDataExcel.mockResolvedValueOnce();

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const buttonComponent = screen.getByRole('button', { name: /Download file/i });
    expect(buttonComponent).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(downloadDataExcel).toHaveBeenCalled();
      expect(screen.getByText('Excel data downloaded successfully !!!')).toBeInTheDocument();
    });
  });

  test('handles fail data Excel file download', async () => {
    downloadDataExcel.mockRejectedValueOnce(
      new Error('Error occured while data downloading ! Please try again !!!')
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const buttonComponent = screen.getByRole('button', { name: /Download file/i });
    expect(buttonComponent).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(buttonComponent);
    });

    await waitFor(() => {
      expect(downloadDataExcel).toHaveBeenCalled();
      expect(
        screen.getByText('Error occured while data downloading ! Please try again !!!')
      ).toBeInTheDocument();
    });
  });

  test('should handle empty filter values', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );

    await waitFor(() => {
      expect(getData).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        expect.objectContaining({
          subsector: [],
          category: [],
          brand: [],
          brandForm: [],
          sku: [],
          prodName: [],
          customerItemNumber: [],
          active: ['Active']
        })
      );
    });
  });

  test('should display SnackBar on network error', async () => {
    getData.mockRejectedValueOnce(new Error('Network Error'));

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => content.includes('Network Error'))
      ).toBeInTheDocument();
    });
  });

  test('should handle cancel event', async () => {
    cancelRowData.mockResolvedValueOnce({});
    getData.mockResolvedValueOnce(mockData);

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const cancelButton = await screen.findByLabelText('Cancel Event');

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await act(async () => {
      const confirmButton = screen.getByText('Cancel Event');
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(cancelRowData).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText('Promo Cancelled successfully !!!')).toBeInTheDocument();
    });
  });

  test('should handle download blank Excel', async () => {
    downloadBlankExcel.mockResolvedValueOnce();

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const downloadButton = screen.getByRole('button', { name: /Download blank template/i });
    await act(async () => {
      fireEvent.click(downloadButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Excel template downloaded successfully !!!')).toBeInTheDocument();
    });
  });

  test('should handle upload data Excel', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    uploadDataExcel.mockResolvedValueOnce({ data: {} });
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const uploadButton = screen.getByLabelText('Upload file');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Upload New Data')).toBeInTheDocument();
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData), expect.any(Object));
    });
  });

  test('should open Edit Dialog when Edit button clicked', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const EditButton = await screen.findByLabelText('Edit Event');
    await act(async () => {
      fireEvent.click(EditButton);
    });
  });

  test('should replace history state after loading message data', async () => {
    const mockLocationState = { messageData: 'Test message' };
    Object.defineProperty(window, 'history', {
      value: {
        replaceState: jest.fn()
      },
      writable: true
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(window.history.replaceState).toHaveBeenCalledWith(expect.any(Object), '');
  });

  test('should handle data loading cancellation', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const mockAbortController = {
      signal: {
        aborted: true
      }
    };

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await act(async () => {
      uploadDataExcel.mockImplementationOnce(() => {
        throw { name: 'AbortError' };
      });
    });

    expect(screen.getByTestId('upload').value).toBe('');
  });

  test('should reset hovered row on mouse leave', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);
    fireEvent.mouseLeave(mockRow);

    expect(screen.queryByLabelText('Edit Event')).not.toBeInTheDocument();
  });

  test('should close edit dialog', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);
    const editButton = await screen.findByLabelText('Edit Event');
    await act(async () => {
      fireEvent.click(editButton);
    });

    const closeButton = screen.getByLabelText('close');
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(screen.queryByTestId('editEvent')).not.toBeInTheDocument();
  });

  test('should set selected event IDs and open cancel dialog', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('MVM')).toBeInTheDocument();
    });

    const mockRow = screen.getAllByRole('row')[1];
    fireEvent.mouseEnter(mockRow);

    userEvent.hover(mockRow);

    const selectCheckbox = within(mockRow).getByRole('checkbox', { hidden: true });
    await act(async () => {
      fireEvent.click(selectCheckbox);
    });

    const cancelButton = screen.getByLabelText('Cancel Event');
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    const confirmButton = screen.getByText('Cancel Event');
    expect(confirmButton).toBeInTheDocument();
  });

  test('should alert if no file is selected', async () => {
    window.alert = jest.fn();

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      const event = { target: { files: [] } };
      fireEvent.change(fileInput, event);
    });

    expect(window.alert).toHaveBeenCalledWith('Please select a file');
  });

  test('should alert if no file is selected', async () => {
    window.alert = jest.fn();

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      );
    });

    const fileInput = screen.getByTestId('upload');
    await act(async () => {
      const event = { target: { files: [] } };
      fireEvent.change(fileInput, event);
    });

    expect(window.alert).toHaveBeenCalledWith('Please select a file');
  });
});
