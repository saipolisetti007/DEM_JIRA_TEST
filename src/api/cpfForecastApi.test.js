import { performApiRequest } from './apiUtils';
import {
  cpfPendingCount,
  cpfGetForecast,
  cpfDecisions,
  cpfFilters,
  cpfThresholdList,
  cpfThresholdAdd,
  cpfThresholdEdit,
  cpfThresholdDelete,
  fetchThresholdFilters,
  cpfSkuForecast
} from './cpfForecastApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('cpfForecastApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get cpf filters', async () => {
    const mockFilters = {
      subsector: ['Skin and Personal Care'],
      category: ['Auto Dish'],
      brand: ['Cascade'],
      brandForm: ['brandForm4'],
      sku: ['sku4'],
      prod_name: ['Product1'],
      customer_item_number: ['123456'],
      eventType: ['MVM'],
      eventSubtype: ['Future Value'],
      customer_id: ['2000038335'],
      comments: ['test']
    };
    performApiRequest.mockResolvedValueOnce(mockFilters);
    const result = await cpfFilters();
    expect(result).toEqual(mockFilters);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/filters/', 'POST', {
      brand: [],
      category: [],
      subsector: [],
      brandForm: [],
      sku: [],
      customerItemNumber: [],
      prodName: [],
      eventType: [],
      eventSubtype: [],
      customerId: [],
      comments: []
    });
  });

  test('get SKU table data', async () => {
    const mockData = [
      {
        forecast: [
          {
            week: '08/26/2024',
            unit: 88729.55,
            prevUnits: 90000.0
          }
        ],
        units: 1
      }
    ];
    const skuData = [{ customer_id: 1, sku: 1, eventType: [], eventSubtype: [] }];
    performApiRequest.mockResolvedValueOnce(mockData);
    const result = await cpfSkuForecast(skuData);
    expect(result).toEqual(mockData);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-sku-forecast/', 'POST', skuData);
  });

  test('get pending products count', async () => {
    const data = [{ pending_approvals_count: 4 }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfPendingCount();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/count-pending-approvals/');
  });

  test('cpfGetForecast data with sku', async () => {
    const data = {
      sku: '100123456'
    };
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetForecast();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-forecast-sku-list/', 'POST', {
      brand: [],
      category: [],
      subsector: [],
      brandForm: [],
      sku: [],
      prodName: [],
      customerItemNumber: [],
      eventType: [],
      eventSubtype: [],
      customerId: [],
      status: [],
      comments: []
    });
  });

  test('should append filters to the URL when filters are provided', async () => {
    const filters = {
      brand: ['Dawn'],
      prodName: ['Product1'],
      customerItemNumber: ['123456'],
      customerId: ['123'],
      status: ['Pending'],
      comments: ['test']
    }; // Updated keys
    const data = {
      sku: '100123456'
    };
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetForecast(filters);
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-forecast-sku-list/', 'POST', {
      brand: ['Dawn'],
      category: [],
      subsector: [],
      brandForm: [],
      sku: [],
      prodName: ['Product1'],
      customerItemNumber: ['123456'],
      eventType: [],
      eventSubtype: [],
      customerId: ['123'],
      status: ['Pending'],
      comments: ['test']
    });
  });

  test('Approve Data', async () => {
    const rowData = {
      sku: '100123456',
      forecast: [
        {
          week: '05/27/2024',
          approved: true,
          active: true
        }
      ]
    };
    performApiRequest.mockResolvedValueOnce(rowData);
    await cpfDecisions(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-forecast/', 'POST', rowData);
  });

  test('get data with customer value', async () => {
    const customerId = '123';
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfThresholdList(customerId);
    expect(result).toEqual(data);
    const url = `/cpf/threshold-items/?customer=${customerId}`;
    expect(performApiRequest).toHaveBeenCalledWith(url);
  });
  test('adds new row data', async () => {
    const rowData = { id: 1, name: 'test' };
    performApiRequest.mockResolvedValueOnce(rowData);
    await cpfThresholdAdd(rowData);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/threshold-add/', 'POST', rowData);
  });

  test('updates row data', async () => {
    const rowData = { id: 1, name: 'test' };
    const rowId = 1;
    performApiRequest.mockResolvedValueOnce(rowData);

    await cpfThresholdEdit(rowId, rowData);
    const url = `/cpf/threshold-edit/${rowId}/`;
    expect(performApiRequest).toHaveBeenCalledWith(url, 'PUT', rowData);
  });

  test('cancel row data', async () => {
    const rowId = 1;
    performApiRequest.mockResolvedValueOnce(rowId);
    await cpfThresholdDelete(rowId);
    const url = `/cpf/threshold-items/${rowId}/cancel/`;
    expect(performApiRequest).toHaveBeenCalledWith(url, 'DELETE');
  });

  test('fetch threshold filters', async () => {
    const data = [{ id: 1, name: 'test' }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await fetchThresholdFilters();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/threshold-rules/filters?');
  });
});
