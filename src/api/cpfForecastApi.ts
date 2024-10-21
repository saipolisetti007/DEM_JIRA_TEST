import { FilterResponseType, SelectedFiltersType } from '../components/CPFForecast/CPFForecastMain';
import { RequestBodyType } from '../components/CPFForecast/SkuItem';
import { performApiRequest } from './apiUtils';

type ForecastFiltersType = {
  brand?: string[];
  category?: string[];
  subsector?: string[];
  brandForm?: string[];
  sku?: string[];
  prodName?: string[];
  customerItemNumber?: string[];
  eventType?: string[];
  eventSubtype?: string[];
  customerId?: string[];
  status?: string[];
  comments?: string[];
};

type SelectedDataType = {
  sku: string;
  units: string | null;
  forecast: any[];
};
// Fetches CPF filters based on provided filters or default filters
export const cpfFilters = async (
  filters: SelectedFiltersType | {} = {}
): Promise<FilterResponseType> => {
  const defaultFilters = {
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
  };

  const payload = { ...defaultFilters, ...filters };

  const url: string = 'cpf/filters/';
  return await performApiRequest(url, 'POST', payload);
};

export const cpfGetForecast = async (filters: ForecastFiltersType = {}) => {
  const url = 'cpf/cpf-forecast-sku-list/';

  const body = {
    brand: filters.brand || [],
    category: filters.category || [],
    subsector: filters.subsector || [],
    brandForm: filters.brandForm || [],
    sku: filters.sku || [],
    prodName: filters.prodName || [],
    customerItemNumber: filters.customerItemNumber || [],
    eventType: filters.eventType || [],
    eventSubtype: filters.eventSubtype || [],
    customerId: filters.customerId || [],
    status: filters.status || [],
    comments: filters.comments || []
  };

  return await performApiRequest(url, 'POST', body);
};

//Fetches SKU table forecast data (new and previous) based on sku data
export const cpfSkuForecast = async (skuData: RequestBodyType) => {
  return await performApiRequest('cpf/cpf-sku-forecast/', 'POST', skuData);
};

// Submits CPF decisions data (user selected data) to the API
export const cpfDecisions = async (selectedData: SelectedDataType) => {
  await performApiRequest('cpf/cpf-forecast/', 'POST', selectedData);
};

// Fetches the count of pending CPF approvals on Dashboard page
export const cpfPendingCount = async () => {
  return await performApiRequest('cpf/count-pending-approvals/');
};

export const cpfThresholdList = async (customerId: string | null) => {
  const url = `/cpf/threshold-items/?customer=${customerId}`;
  return await performApiRequest(url);
};

// Adds a new CPF threshold rule based on the provided data
export const cpfThresholdAdd = async (data) => {
  await performApiRequest('cpf/threshold-add/', 'POST', data);
};

// Edits an existing CPF threshold rule based on the provided data
export const cpfThresholdEdit = async (rowId, data) => {
  const url = `/cpf/threshold-edit/${rowId}/`;
  await performApiRequest(url, 'PUT', data);
};

// Deletes a CPF threshold rule based on the provided row ID
export const cpfThresholdDelete = async (rowId) => {
  const url = `/cpf/threshold-items/${rowId}/cancel/`;
  await performApiRequest(url, 'DELETE');
};

// Fetches filters for CPF threshold rules for subsector, category, brand and brandform
export const fetchThresholdFilters = async (...reqParams) => {
  const url = `cpf/threshold-rules/filters?${reqParams}`;
  return await performApiRequest(url);
};
