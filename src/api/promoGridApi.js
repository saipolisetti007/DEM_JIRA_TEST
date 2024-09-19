import { performApiRequest } from './apiUtils';

// Fetch promogrid paginated data with optional filters
export const getData = async (pageIndex, pageSize, filters = {}) => {
  const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;

  const filterParams = Object.keys(filters).reduce((acc, key) => {
    acc[key] = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
    return acc;
  }, {});

  return await performApiRequest(url, 'POST', filterParams);
};

// Fetch user profile data using in navigation component
export const getUserProfile = async () => {
  return await performApiRequest('user-profile');
};

// Fetch event types for a specific customer
export const getEvents = async (customerId) => {
  const url = `promo/event-types/?golden_customer_id=${customerId}`;
  return await performApiRequest(url);
};

// Fetch list of countries for Countries dropdown
export const getCountries = async () => {
  return await performApiRequest('masterdata/countries/');
};

// Add a new row of data to the promo grid  table uisng add record button
export const addNewRowData = async (rowData) => {
  return await performApiRequest('promo/promo-grid-add/', 'POST', rowData);
};

// Update an existing row of data based on new data on edit icon click on table row
export const updateRowData = async (newData) => {
  return await performApiRequest('promo/promo-grid-edit/', 'POST', newData);
};

// Cancel a row of data based on the row id, customerId  on cancel icon click on table row
export const cancelRowData = async (rowData) => {
  await performApiRequest('promo/promo-grid-cancel/', 'POST', rowData);
};

// Helper function to download an Excel file
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

// Download a blank Excel template based on customer id
export const downloadBlankExcel = async (customersId) => {
  const url = `promo/excel-template/download/?customerId=${customersId}`;
  await downloadExcel(url, 'GET', 'DEM - Promo Grid Template.xlsx');
};

// Download existing data as an Excel file with filters
export const downloadDataExcel = async (filters = {}) => {
  const body = {
    brand: filters.brand || [],
    category: filters.category || [],
    subsector: filters.subsector || [],
    brandForm: filters.brandForm || [],
    active: filters.active || [],
    sku: filters.sku || [],
    customerItemNumber: filters.customerItemNumber || [],
    customerId: filters.customerId || [],
    custFlag: filters.custFlag || [],
    prodName: filters.prodName || []
  };

  const endpoint = 'promo/existing-data/download/';
  await downloadExcel(endpoint, 'POST', 'DEM - Promo Grid Data.xlsx', body);
};

// Download selected data as an Excel file with selected event ids
export const downloadSelectedDataExcel = async (selectedEventIds, customerId) => {
  const body = {
    events: selectedEventIds,
    customerId: [customerId]
  };

  const endpoint = 'promo/selected-data/download/';
  await downloadExcel(endpoint, 'POST', 'Selected_Promo_Grid_Data.xlsx', body);
};

// Upload data from an Excel file to the promo grid table
export const uploadDataExcel = async (formData) => {
  return await performApiRequest('promo/promo-grid-file-upload/', 'POST', formData);
};

// Get validation results for a promo header
export const promoGridGetValidations = async (promoHeader) => {
  const url = `promo/promo-grid-validate/?promo_header=${promoHeader}`;
  return await performApiRequest(url);
};

// Validate a row of data based on the row data
export const promoGridValidate = async (rowData) => {
  return await performApiRequest('promo/promo-grid-validate/', 'POST', rowData);
};

// Submit a row data with promoheader to the backend to update in the promo grid table
export const promoGridSubmit = async (promoHeader) => {
  await performApiRequest('promo/promo-grid-submit/', 'POST', promoHeader);
};

// Fetch filters for the promo grid table
export const promoGridFilters = async (filters = {}) => {
  const defaultFilters = {
    brand: [],
    category: [],
    subsector: [],
    brandForm: [],
    active: [],
    sku: [],
    customerItemNumber: [],
    custFlag: [],
    prodName: [],
    customerId: []
  };

  const payload = { ...defaultFilters, ...filters };

  const url = 'promo/filter/';
  return await performApiRequest(url, 'POST', payload);
};

// Fetch column settings for the promo grid table for add/edt
export const promoGridColumnSettings = async () => {
  return await performApiRequest('promo/promo-grid-column-settings/', 'GET');
};

// update column settings for the promo grid based on user selected columns
export const promoGridColumnCreate = async (columnsData) => {
  await performApiRequest('promo/promo-grid-column-settings/create/', 'POST', columnsData);
};
