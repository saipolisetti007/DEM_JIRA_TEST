import { performApiRequest } from './apiUtils';

export const getData = async (pageIndex, pageSize) => {
  const url = `promo/promo-grid-list/?page=${pageIndex + 1}&page_size=${pageSize}`;
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

const downloadExcel = async (endpoint, filename) => {
  const response = await performApiRequest(endpoint, 'GET', null, 'blob');
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
  await downloadExcel('promo/excel-template/download/', 'DEM - Promo Grid Template.xlsx');
};

export const downloadDataExcel = async () => {
  await downloadExcel('promo/existing-data/download/', 'DEM - Promo Grid Data.xlsx');
};

export const uploadDataExcel = async (formData) => {
  const response = await performApiRequest('promo/promo-grid-file-upload/', 'POST', formData);
  return response;
};
