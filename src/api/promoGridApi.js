import { performApiRequest } from './apiUtils';

export const getData = async (pageIndex, pageSize, filters = {}) => {
  const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;

  const filterParams = Object.keys(filters).reduce((acc, key) => {
    acc[key] = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
    return acc;
  }, {});

  const response = await performApiRequest(url, 'POST', filterParams);

  return response;
};

export const getUserProfile = async () => {
  return await performApiRequest('user-profile');
};

export const getEvents = async (customerId) => {
  const url = `promo/event-types/?golden_customer_id=${customerId}`;
  const response = await performApiRequest(url);
  return response;
};

export const addNewRowData = async (rowData) => {
  const response = await performApiRequest('promo/promo-grid-add/', 'POST', rowData);
  return response;
};

export const updateRowData = async (newData) => {
  const response = await performApiRequest('promo/promo-grid-edit/', 'POST', newData);
  return response;
};

export const cancelRowData = async (rowData) => {
  await performApiRequest('promo/promo-grid-cancel/', 'POST', rowData);
};

const downloadExcel = async (endpoint, request, filename, body = null) => {
  const response = await performApiRequest(endpoint, request, body, 'blob');
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' });

  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.setAttribute('download', filename);

  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
};

export const downloadBlankExcel = async () => {
  await downloadExcel('promo/excel-template/download/', 'GET', 'DEM - Promo Grid Template.xlsx');
};

export const downloadDataExcel = async (filters = {}) => {
  const body = {
    brand: filters.brand || [],
    category: filters.category || [],
    subsector: filters.subsector || [],
    brandForm: filters.brandForm || [],
    active: filters.active || [],
    sku: filters.sku || []
  };

  const endpoint = 'promo/existing-data/download/';
  await downloadExcel(endpoint, 'POST', 'DEM - Promo Grid Data.xlsx', body);
};

export const uploadDataExcel = async (formData) => {
  const response = await performApiRequest('promo/promo-grid-file-upload/', 'POST', formData);
  return response;
};

export const promoGridGetValidations = async (promoHeader) => {
  const url = `promo/promo-grid-validate/?promo_header=${promoHeader}`;
  const response = await performApiRequest(url);
  return response;
};

export const promoGridValidate = async (rowData) => {
  const response = await performApiRequest('promo/promo-grid-validate/', 'POST', rowData);
  return response;
};

export const promoGridSubmit = async (promoHeader) => {
  await performApiRequest('promo/promo-grid-submit/', 'POST', promoHeader);
};

export const promoGridFilters = async () => {
  const url = 'promo/filter/';
  const response = await performApiRequest(url, 'GET');
  return response;
};
