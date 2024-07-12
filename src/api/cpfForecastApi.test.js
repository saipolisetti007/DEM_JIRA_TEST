import { performApiRequest } from './apiUtils';
import {
  cpfDecisionAction,
  cpfGetData,
  cpfPendingCount,
  cpfGetForecast,
  cpfDecisions,
  cpfFilters
} from './cpfForecastApi';

jest.mock('./apiUtils', () => ({
  performApiRequest: jest.fn()
}));

describe('cpfForecastApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get data with correct parameters', async () => {
    const data = [{ id: 1, product_id: 1 }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetData();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/pending-cpf-forecasts/');
  });

  test('get cpf filters', async () => {
    const mockFilters = {
      subsector: ['Skin and Personal Care'],
      category: ['Auto Dish'],
      brand: ['Cascade'],
      brandForm: ['brandForm4'],
      sku: ['sku4']
    };
    performApiRequest.mockResolvedValueOnce(mockFilters);
    const result = await cpfFilters();
    expect(result).toEqual(mockFilters);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/filters/');
  });

  test('get pending products count', async () => {
    const data = [{ pending_approvals_count: 4 }];
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfPendingCount();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/count-pending-approvals/');
  });

  test('Approve Reject Selections', async () => {
    const selections = { 1: 'approve' };
    performApiRequest.mockResolvedValueOnce(selections);
    await cpfDecisionAction(selections);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-decision/', 'POST', selections);
  });

  test('cpfGetForecast data with sku', async () => {
    const data = {
      sku: '100123456',
      forecast: [
        {
          week: '05/27/2024',
          units: '123456',
          approved: false,
          active: true
        }
      ]
    };
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetForecast();
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-forecast-list/', 'POST', {
      brand: [],
      category: [],
      subsector: [],
      brandForm: [],
      sku: []
    });
  });

  test('should append filters to the URL when filters are provided', async () => {
    const filters = { brand: ['Dawn'] };
    const data = {
      sku: '100123456',
      forecast: [
        {
          week: '05/27/2024',
          units: '123456',
          approved: false,
          active: true
        }
      ]
    };
    performApiRequest.mockResolvedValueOnce(data);
    const result = await cpfGetForecast(filters);
    expect(result).toEqual(data);
    expect(performApiRequest).toHaveBeenCalledWith('cpf/cpf-forecast-list/', 'POST', {
      brand: ['Dawn'],
      category: [],
      subsector: [],
      brandForm: [],
      sku: []
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
});
