import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  addNewRowData,
  downloadBlankExcel,
  downloadDataExcel,
  getData,
  uploadDataExcel
} from '../../api/promoGridApi';

import PromoGridData from './PromoGridData';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
// Mocking the getData function
jest.mock('../../api/promoGridApi');

describe('PromoGridData Component', () => {
  beforeEach(() => {
    getData.mockResolvedValue([]);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    await waitFor(async () => {
      expect(uploadDataExcel).toHaveBeenCalledWith(expect.any(FormData));
      expect(
        screen.getByText('Error occured while updating the data ! Please try again !!!')
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

  test('should fetch and render data', async () => {
    // Mock the API response
    const mockData = require('../../__mocks__/promoGridData.json');
    getData.mockResolvedValue(mockData);
    await act(async () => {
      render(
        <BrowserRouter>
          <PromoGridData />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      mockData.forEach(async (item) => {
        expect(await screen.findByText(item.goldenCustomerID)).toBeInTheDocument();
        expect(await screen.findByText(item.eventType)).toBeInTheDocument();
      });
    });
  });

  test('should add new row data', async () => {
    // Mock the API response

    const mockData = require('../../__mocks__/promoGridData.json');
    addNewRowData.mockResolvedValue({ results: mockData });

    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );

    const addRowButton = screen.getByText('Add New Record');
    fireEvent.click(addRowButton);

    const goldenCustomerID = screen.getByRole('textbox', { name: /Golden Customer ID/i });
    const eventType = screen.getByRole('textbox', { name: /Event Type/i });
    const eventSubtype = screen.getByRole('textbox', { name: /Event Subtype/i });
    const eventSalesChannel = screen.getByRole('textbox', { name: /Event Sales Channel/i });
    const itemType = screen.getByRole('textbox', { name: /Item Type/i });
    const bu = screen.getByRole('textbox', { name: 'BU' });
    const idType = screen.getByRole('textbox', { name: /ID Type/i });
    const countryCode = screen.getByRole('textbox', { name: /Country Code/i });
    const productID = screen.getByRole('textbox', { name: /Product ID/i });
    const customerItemNumber = screen.getByRole('textbox', { name: /Customer Item Number/i });

    fireEvent.change(goldenCustomerID, { target: { value: '123' } });
    fireEvent.change(eventType, { target: { value: 'text' } });
    fireEvent.change(eventSubtype, { target: { value: 'text' } });
    fireEvent.change(eventSalesChannel, { target: { value: 'text' } });
    fireEvent.change(itemType, { target: { value: 'text' } });
    fireEvent.change(bu, { target: { value: 'text' } });
    fireEvent.change(idType, { target: { value: 'text' } });
    fireEvent.change(countryCode, { target: { value: 'text' } });
    fireEvent.change(productID, { target: { value: '123' } });
    fireEvent.change(customerItemNumber, { target: { value: '123' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(async () => {
      setTimeout(() => {
        expect(addNewRowData).toHaveBeenCalledWith({
          golden_customer_id: goldenCustomerID.value
        });
        expect(screen.getByText('New data added successfully !!!')).toBeInTheDocument();
      }, 1000);
    });
  });

  test('should failed to add data if addrowdata failed', async () => {
    const errorResponse = {
      response: {
        data: {
          field1: 'Error message for field',
          field2: 'Error message for field'
        }
      }
    };

    addNewRowData.mockRejectedValueOnce(errorResponse);

    render(
      <BrowserRouter>
        <PromoGridData />
      </BrowserRouter>
    );

    const addRowButton = screen.getByText('Add New Record');
    fireEvent.click(addRowButton);

    const goldenCustomerID = screen.getByRole('textbox', { name: /Golden Customer ID/i });

    fireEvent.change(goldenCustomerID, { target: { value: 123 } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(async () => {
      setTimeout(() => {
        expect(screen.getByText(/Error message for field/)).toBeInTheDocument();
      }, 1000);
    });
  });
});
