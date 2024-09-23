import { performApiRequest } from './apiUtils';

// Fetches CPF filters based on provided filters or default filters
export const cpfFilters = async (filters = {}) => {
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
    customerId: []
  };

  const payload = { ...defaultFilters, ...filters };

  const url = 'cpf/filters/';
  return await performApiRequest(url, 'POST', payload);
};

// Fetches CPF forecast sku list based on provided filters
export const cpfGetForecast = async (filters = {}) => {
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
    status: filters.status || []
  };

  return await performApiRequest(url, 'POST', body);
};

//Fetches SKU table forecast data (new and previous) based on sku data
export const cpfSkuForecast = async (skuData) => {
  return await performApiRequest('cpf/cpf-sku-forecast/', 'POST', skuData);
};

// Submits CPF decisions data (user selected data) to the API
export const cpfDecisions = async (selectedData) => {
  await performApiRequest('cpf/cpf-forecast/', 'POST', selectedData);
};

// Fetches the count of pending CPF approvals on Dashboard page
export const cpfPendingCount = async () => {
  return await performApiRequest('cpf/count-pending-approvals/');
};

export const cpfThresholdList = async (customerId) => {
  const url = `/cpf/items/?customer=${customerId}`;
  return await performApiRequest(url);
};

// Adds a new CPF threshold rule based on the provided data
export const cpfThresholdAdd = async (data) => {
  await performApiRequest('cpf/add/', 'POST', data);
};

// Edits an existing CPF threshold rule based on the provided data
export const cpfThresholdEdit = async (rowId, data) => {
  const url = `/cpf/edit/${rowId}/`;
  await performApiRequest(url, 'PUT', data);
};

// Deletes a CPF threshold rule based on the provided row ID
export const cpfThresholdDelete = async (rowId) => {
  const url = `/cpf/items/${rowId}/cancel/`;
  await performApiRequest(url, 'DELETE');
};

// Fetches filters for CPF threshold rules for subsector, category, brand and brandform
export const fetchThresholdFilters = async (...reqParams) => {
  const url = `cpf/threshold-rules/filters?${reqParams}`;
  return await performApiRequest(url);
};
