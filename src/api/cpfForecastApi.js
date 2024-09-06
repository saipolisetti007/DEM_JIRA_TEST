import { performApiRequest } from './apiUtils';

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
    customerId: filters.customerId || []
  };

  return await performApiRequest(url, 'POST', body);
};

export const cpfSkuForecast = async (skuData) => {
  return await performApiRequest('cpf/cpf-sku-forecast/', 'POST', skuData);
};

export const cpfDecisions = async (selectedData) => {
  await performApiRequest('cpf/cpf-forecast/', 'POST', selectedData);
};

export const cpfPendingCount = async () => {
  return await performApiRequest('cpf/count-pending-approvals/');
};

export const cpfThresholdList = async (customerId) => {
  const url = `/cpf/items/?customer=${customerId}`;
  return await performApiRequest(url);
};

export const cpfThresholdAdd = async (data) => {
  await performApiRequest('cpf/add/', 'POST', data);
};

export const cpfThresholdEdit = async (rowId, data) => {
  const url = `/cpf/edit/${rowId}/`;
  await performApiRequest(url, 'PUT', data);
};

export const cpfThresholdDelete = async (rowId) => {
  const url = `/cpf/items/${rowId}/cancel/`;
  await performApiRequest(url, 'DELETE');
};

export const fetchThresholdFilters = async () => {
  return await performApiRequest('cpf/threshold-rules/filters/');
};
