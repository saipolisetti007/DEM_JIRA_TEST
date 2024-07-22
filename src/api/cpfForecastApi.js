import { performApiRequest } from './apiUtils';

export const cpfGetData = async () => {
  const response = await performApiRequest('cpf/pending-cpf-forecasts/');
  return response;
};

export const cpfFilters = async () => {
  const response = await performApiRequest('cpf/filters/');
  return response;
};

export const cpfGetForecast = async (filters = {}) => {
  const url = 'cpf/cpf-forecast-list/';

  const body = {
    brand: filters.brand || [],
    category: filters.category || [],
    subsector: filters.subsector || [],
    brandForm: filters.brandForm || [],
    sku: filters.sku || [],
    prodName: filters.prodName || [],
    customerItemNumber: filters.customerItemNumber || []
  };

  const response = await performApiRequest(url, 'POST', body);
  return response;
};

export const cpfDecisions = async (selectedData) => {
  await performApiRequest('cpf/cpf-forecast/', 'POST', selectedData);
};

export const cpfPendingCount = async () => {
  const response = await performApiRequest('cpf/count-pending-approvals/');
  return response;
};

export const cpfDecisionAction = async (selections) => {
  await performApiRequest('cpf/cpf-decision/', 'POST', selections);
};
