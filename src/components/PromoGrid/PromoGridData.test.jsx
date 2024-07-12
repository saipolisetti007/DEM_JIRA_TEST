import React from 'react';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import {
  cancelRowData,
  downloadDataExcel,
  getData,
  promoGridFilters,
  uploadDataExcel
} from '../../api/promoGridApi';
import PromoGridData from './PromoGridData';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
//import moment from 'moment';
// Mocking the getData function
jest.mock('../../api/promoGridApi');
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
  sku: ['sku4']
};

test('displays SnackBar on network error', async () => {
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
    expect(screen.getByText('Network Error. Could not fetch the data.')).toBeInTheDocument();
  });
});

test('cancels row successfully', async () => {
  cancelRowData.mockResolvedValueOnce({});
  window.confirm = jest.fn(() => true);
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

  const cancelButton = screen.getByLabelText('Cancel Event');
  fireEvent.click(cancelButton);

  await waitFor(() => {
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
    fireEvent.change(fileInput, { target: { files: [file] } });

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
    fireEvent.change(fileInput, { target: { files: [file] } });

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
    fireEvent.change(fileInput, { target: { files: [file] } });

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

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      </Provider>
    );
    await act(async () => {
      const buttonComponent = screen.getByRole('button', { name: /Download file/i });
      expect(buttonComponent).toBeInTheDocument();
      fireEvent.click(buttonComponent);
    });
    await waitFor(() => {
      expect(downloadDataExcel).toHaveBeenCalled();
      expect(getByText('Excel data downloaded successfully !!!')).toBeInTheDocument();
    });
  });

  test('handles fail data Excel file download', async () => {
    downloadDataExcel.mockRejectedValueOnce(
      new Error('Error occured while data downloading ! Please try again !!!')
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      </Provider>
    );
    await act(async () => {
      const buttonComponent = screen.getByRole('button', { name: /Download file/i });
      expect(buttonComponent).toBeInTheDocument();
      fireEvent.click(buttonComponent);
    });
    await waitFor(() => {
      expect(downloadDataExcel).toHaveBeenCalled();
      expect(
        screen.getByText('Error occured while data downloading ! Please try again !!!')
      ).toBeInTheDocument();
    });
  });

  test('should fetch and render filters', async () => {
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
      expect(getData).toHaveBeenCalledTimes(1);
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
    expect(filterSelect).toBeInTheDocument;
  });

  test('should fetch data error', async () => {
    getData.mockRejectedValueOnce();
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
      expect(getData).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Network Error. Could not fetch the data.')).toBeInTheDocument();
    });
  });

  test('should Handlecancel Success', async () => {
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

    const cancelButton = screen.getByLabelText('Cancel Event');
    fireEvent.click(cancelButton);

    const confirmButton = screen.getByText('Cancel Event');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(cancelRowData).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText('Promo Cancelled successfully !!!')).toBeInTheDocument();
    });
  });

  test('should Handlecancel Failure', async () => {
    cancelRowData.mockRejectedValue({});
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

    const cancelButton = screen.getByLabelText('Cancel Event');
    fireEvent.click(cancelButton);

    const confirmButton = screen.getByText('Cancel Event');
    fireEvent.click(confirmButton);

    await waitFor(async () => expect(cancelRowData).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('Error occurred while cancelling the data !!!')).toBeInTheDocument();
    });
  });

  test('should open AddEditDialog when add button clicked', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    const addRowButton = screen.getByText('Add New Event');
    await act(async () => {
      fireEvent.click(addRowButton);
    });
    expect(screen.getByTestId('newEvent')).toBeInTheDocument;
  });

  test('should handle closing with backdropclick reason', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    const addRowButton = screen.getByText('Add New Event');
    await act(async () => {
      fireEvent.click(addRowButton);
    });
    const addDialog = screen.getByRole('dialog');
    fireEvent.keyDown(addDialog, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('should handle closing with backdropclick reason add', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PromoGridData />
          </BrowserRouter>
        </Provider>
      )
    );
    const addRowButton = screen.getByText('Add New Event');
    await act(async () => {
      fireEvent.click(addRowButton);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Event in store start date/i), {
        target: { value: mockData.results[0].event_in_store_start_date }
      });
      fireEvent.change(screen.getByLabelText(/Event in store end date/i), {
        target: { value: mockData.results[0].event_in_store_end_date }
      });

      fireEvent.change(screen.getByLabelText(/event sales channel/i), {
        target: { value: mockData.results[0].event_sales_channel }
      });
    });
    const nextButton = screen.getByText('Next Step');
    await act(async () => {
      fireEvent.click(nextButton);
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

    const EditButton = screen.getByLabelText('Edit Event');
    await act(async () => {
      fireEvent.click(EditButton);
    });
  });
});
