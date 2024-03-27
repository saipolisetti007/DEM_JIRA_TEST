import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addNewRowData, deleteRowData, getData, updateRowData } from '../../api/promoGridApi';
import PromoGridData from './PromoGridData';

// Mocking the getData function
jest.mock('../../api/promoGridApi');

const mockStore = configureStore([]);

describe('PromoGridData Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      promoData: {
        promoData: []
      }
    });
  });

  test('should fetch and render data from Redux store', async () => {
    // Mock the API response
    const mockData = require('../../__mocks__/promoGridData.json');
    getData.mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    await waitFor(() => {
      mockData.forEach(async (item) => {
        expect(await screen.findByText(item.goldenCustomerID)).toBeInTheDocument();
        expect(await screen.findByText(item.eventType)).toBeInTheDocument();
      });
    });
  });
  test('should add new row data', async () => {
    // Mock the API response
    addNewRowData.mockResolvedValue({});
    const mockData = require('../../__mocks__/promoGridData.json');
    getData.mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
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
  });

  test('should Update row data', async () => {
    // Mock the API response
    updateRowData.mockResolvedValue({});
    const mockData = require('../../__mocks__/promoGridData.json');
    getData.mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );
  });

  test('should delete row data', async () => {
    // Mock the API response
    deleteRowData.mockResolvedValueOnce({});
    const mockData = require('../../__mocks__/promoGridData.json');
    getData.mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <PromoGridData />
      </Provider>
    );

    // await waitFor(async () => {
    //   const tableElement = screen.getByRole('table');
    //   expect(tableElement).toBeInTheDocument();
    //   mockData.forEach(async (item) => {
    //     const goldenCustomerID = await screen.findByText(item.goldenCustomerID);
    //     expect(goldenCustomerID).toBeInTheDocument();
    //     expect(await screen.findByText(item.eventType)).toBeInTheDocument();
    //   });
    // });
  });
});
