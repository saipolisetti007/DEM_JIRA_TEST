import React from 'react';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import {
  addNewRowData,
  cancelRowData,
  downloadDataExcel,
  getData,
  promoGridFilters,
  updateRowData,
  uploadDataExcel
} from '../../api/promoGridApi';
import PromoGridData from './PromoGridData';

import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
  });

  await waitFor(() => {
    expect(screen.getByText('Network Error. Could not fetch the data.')).toBeInTheDocument();
  });
});

test('displays SnackBar on successful data update', async () => {
  updateRowData.mockResolvedValueOnce({});
  getData.mockResolvedValueOnce(mockData);

  await act(async () => {
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
  });

  const editButton = screen.getByLabelText('Edit');
  fireEvent.click(editButton);

  const saveButton = screen.getByText('Save');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(screen.getByText('Data Updated successfully !!!')).toBeInTheDocument();
  });
});

test('cancels row successfully', async () => {
  cancelRowData.mockResolvedValueOnce({});
  window.confirm = jest.fn(() => true);
  getData.mockResolvedValueOnce(mockData);

  await act(async () => {
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
  });

  const cancelButton = screen.getByLabelText('Cancel');

  fireEvent.click(cancelButton);

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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );
  });

  test('handles Excel file upload', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    uploadDataExcel.mockResolvedValueOnce({ data: {} });
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );

    await act(async () => {
      const fileInput = screen.getByTestId('upload');
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData));
    });
  });

  test('shows an alert if no file is selected', async () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
    await act(async () => {
      const fileInput = screen.getByTestId('upload');
      fireEvent.change(fileInput, { target: { files: [] } });
    });
    expect(window.alert).toHaveBeenCalledWith('Please select a file');
  });

  test('shows an alert if selected file is not excel', async () => {
    window.alert = jest.fn();
    const file = new File(['data'], 'example.png', {
      type: 'image/png'
    });
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
    await act(async () => {
      const fileInput = screen.getByTestId('upload');
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(window.alert).toHaveBeenCalledWith('Please select an excel file');
  });

  test('handles upload failure', async () => {
    const file = new File(['data'], 'example.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    uploadDataExcel.mockRejectedValueOnce(new Error('Upload failed'));
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );

    await act(async () => {
      const fileInput = screen.getByTestId('upload');
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData));
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
    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );

    await act(async () => {
      const fileInput = screen.getByTestId('upload');
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData));
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
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
    await act(async () => {
      fireEvent.click(getByText(/Download Filled Template/i));
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
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByText(/Download Filled Template/i));
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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
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
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
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
    cancelRowData.mockResolvedValue({});
    window.confirm = jest.fn(() => true);
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );
    const cancelButton = screen.getByLabelText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => expect(cancelRowData).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('Promo Cancelled successfully !!!')).toBeInTheDocument();
    });
  });

  test('should Handlecancel Failure', async () => {
    cancelRowData.mockRejectedValue({});
    window.confirm = jest.fn(() => true);
    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );
    const cancelButton = screen.getByLabelText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => expect(cancelRowData).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByText('Error occured while cancel the data !!!')).toBeInTheDocument();
    });
  });

  test('should add new row data', async () => {
    addNewRowData.mockResolvedValue(mockData.results);

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );

    const addRowButton = screen.getByText('Add New Record');
    await act(async () => {
      fireEvent.click(addRowButton);
    });

    const golden_customer_id = screen.getByRole('textbox', { name: /Golden Customer ID/i });
    const event_type = screen.getByRole('textbox', { name: /Event Type/i });
    const event_subtype = screen.getByRole('textbox', { name: /Event Subtype/i });
    const event_sales_channel = screen.getByRole('textbox', { name: /Event Sales Channel/i });
    const item_type = screen.getByRole('textbox', { name: /Item Type/i });
    const id_type = screen.getByRole('textbox', { name: /ID Type/i });
    const country_code = screen.getByRole('textbox', { name: /Country Code/i });
    const product_id = screen.getByRole('textbox', { name: /Product ID/i });
    const customer_item_number = screen.getByRole('textbox', { name: /Customer Item Number/i });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });
    const event_publish_to_demand = screen
      .getByTestId('event_publish_to_demand_radio')
      .querySelector("input[value='yes']");
    expect(golden_customer_id.value).toBe('');
    await act(async () => {
      fireEvent.change(golden_customer_id, {
        target: { value: mockData.results[0].golden_customer_id }
      });

      fireEvent.change(event_type, { target: { value: mockData.results[0].event_type } });

      fireEvent.change(event_subtype, { target: { value: mockData.results[0].event_subtype } });

      fireEvent.change(event_sales_channel, {
        target: { value: mockData.results[0].event_sales_channel }
      });

      fireEvent.change(item_type, { target: { value: mockData.results[0].item_type } });

      fireEvent.change(id_type, { target: { value: mockData.results[0].item_type } });

      fireEvent.change(country_code, { target: { value: mockData.results[0].country_code } });

      fireEvent.change(product_id, { target: { value: mockData.results[0].product_id } });

      fireEvent.change(customer_item_number, {
        target: { value: mockData.results[0].customer_item_number }
      });

      fireEvent.change(event_in_store_start_date, {
        target: { value: mockData.results[0].event_in_store_start_date }
      });

      fireEvent.change(event_in_store_end_date, {
        target: { value: mockData.results[0].event_in_store_end_date }
      });
      fireEvent.click(event_publish_to_demand);
    });
    await waitFor(() => {
      expect(golden_customer_id.value).toBe(mockData.results[0].golden_customer_id.toString());
      expect(event_type.value).toBe(mockData.results[0].event_type);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
  test('should failed to add data if addrowdata failed', async () => {
    const errorResponse = {
      response: {
        data: {
          errors: [{ field: 'name', error: 'Name is required' }]
        }
      }
    };

    addNewRowData.mockRejectedValueOnce(errorResponse);

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );

    const addRowButton = screen.getByText('Add New Record');
    await act(async () => {
      fireEvent.click(addRowButton);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
  test('should Update row data', async () => {
    updateRowData.mockResolvedValue(mockData.results);

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );
    const EditButton = screen.getByLabelText('Edit');
    expect(EditButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(EditButton);
    });

    const golden_customer_id = screen.getByRole('textbox', { name: /Golden Customer ID/i });

    const event_type = screen.getByRole('textbox', { name: /Event Type/i });
    const event_subtype = screen.getByRole('textbox', { name: /Event Subtype/i });
    const event_sales_channel = screen.getByRole('textbox', { name: /Event Sales Channel/i });
    const item_type = screen.getByRole('textbox', { name: /Item Type/i });
    const id_type = screen.getByRole('textbox', { name: /ID Type/i });
    const country_code = screen.getByRole('textbox', { name: /Country Code/i });
    const product_id = screen.getByRole('textbox', { name: /Product ID/i });
    const customer_item_number = screen.getByRole('textbox', { name: /Customer Item Number/i });

    const event_in_store_start_date = screen.getByRole('textbox', {
      name: /Event in Store Start Date/i
    });
    const event_in_store_end_date = screen.getByRole('textbox', {
      name: /Event in Store End Date/i
    });
    const event_publish_to_demand = screen
      .getByTestId('event_publish_to_demand_radio')
      .querySelector("input[value='yes']");

    await act(async () => {
      fireEvent.change(golden_customer_id, {
        target: { value: mockData.results[0].golden_customer_id }
      });

      fireEvent.change(event_type, { target: { value: mockData.results[0].event_type } });

      fireEvent.change(event_subtype, { target: { value: mockData.results[0].event_subtype } });

      fireEvent.change(event_sales_channel, {
        target: { value: mockData.results[0].event_sales_channel }
      });

      fireEvent.change(item_type, { target: { value: mockData.results[0].item_type } });

      fireEvent.change(id_type, { target: { value: mockData.results[0].item_type } });

      fireEvent.change(country_code, { target: { value: mockData.results[0].country_code } });

      fireEvent.change(product_id, { target: { value: mockData.results[0].product_id } });

      fireEvent.change(customer_item_number, {
        target: { value: mockData.results[0].customer_item_number }
      });

      fireEvent.change(event_in_store_start_date, {
        target: { value: mockData.results[0].event_in_store_start_date }
      });

      fireEvent.change(event_in_store_end_date, {
        target: { value: mockData.results[0].event_in_store_end_date }
      });
      fireEvent.click(event_publish_to_demand);
    });
    await waitFor(() => {
      expect(golden_customer_id.value).toBe(mockData.results[0].golden_customer_id.toString());
      expect(event_type.value).toBe(mockData.results[0].event_type);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
  test('should failed to Update data if updaterowdata failed', async () => {
    const errorResponse = {
      response: {
        data: {
          errors: [{ field: 'name', error: 'Name is required' }]
        }
      }
    };

    updateRowData.mockRejectedValueOnce(errorResponse);

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );

    const EditButton = screen.getByLabelText('Edit');
    expect(EditButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(EditButton);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });

  test('should failed to Update data based on golden cutomer id validation', async () => {
    const errorResponse = {
      response: {
        status: 403,
        data: {
          error: 'do not have permission to perform this action'
        }
      }
    };

    updateRowData.mockRejectedValueOnce(errorResponse);

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );

    const EditButton = screen.getByLabelText('Edit');
    expect(EditButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(EditButton);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(updateRowData).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('Error occured while updating the data !!!')).toBeInTheDocument();
    });
  });

  test('should failed to add data based on golden cutomer id validation', async () => {
    addNewRowData.mockRejectedValue();

    await act(async () =>
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      )
    );

    const addRowButton = screen.getByText('Add New Record');
    await act(async () => {
      fireEvent.click(addRowButton);
    });

    const saveButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
