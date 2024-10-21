import { performApiRequest } from './apiUtils';
import { downloadExcel } from './promoGridApi';

// Fetch manual DA List data
export const maualDaList = async () => {
  const url = 'manualda/manualda-list/';
  return await performApiRequest(url, 'POST');
};

// Download a blank Excel template based on customer id
export const downloadBlankExcel = async () => {
  const url = `manualda/excel-template/download/`;
  await downloadExcel(url, 'GET', 'DEM - Manual DA Template.xlsx');
};

//Download existing data as an Excel file with filters
export const downloadDataExcel = async () => {
  const endpoint = 'manualda/existing-data/download/';
  await downloadExcel(endpoint, 'GET', 'DEM - Manual DA Data.xlsx');
};

// Download selected data as an Excel file with selected event ids
export const downloadSelectedDataExcel = async (selectedIds) => {
  const body = { selected_ids: selectedIds };
  const endpoint = 'manualda/selected-data/download/';
  await downloadExcel(endpoint, 'POST', 'DEM - Manual DA Data', body);
};

// Upload data from an Excel file to the promo grid table
export const uploadDataExcel = async (formData) => {
  return await performApiRequest('manualda/upload/', 'POST', formData);
};
