import { performApiRequest } from './apiUtils';
import {
  addPromoData,
  deletePromoData,
  editPromoData
} from '../components/PromoGrid/promoGridSlice';

export const getData = async () => {
  const response = await performApiRequest('promo/promo-grid-list/');
  return response.results;
};

export const addNewRowData = (rowData) => async (dispatch) => {
  const response = await performApiRequest('/promodata', 'POST', rowData);
  dispatch(addPromoData(response));
};

export const updateRowData = (id, newData) => async (dispatch) => {
  const response = await performApiRequest(`/promodata/${id}`, 'PUT', newData);
  dispatch(editPromoData({ id, newData: response }));
};

export const deleteRowData = (id) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const response = await performApiRequest(`/promodata/${id}`, 'DELETE');
  dispatch(deletePromoData(id));
};

export const downloadBlankExcel = async () => {
  const response = await performApiRequest('promo/excel-template/download/', 'GET', null, 'blob');
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' });

  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.setAttribute('download', 'DEM - Promo Grid Template.xlsx');

  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
};

export const downloadDataExcel = async () => {
  const response = await performApiRequest('/promo/existing-data/download/', 'GET', null, 'blob');
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' });

  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.setAttribute('download', 'DEM - Promo Grid Data.xlsx');

  document.body.appendChild(downloadLink);
  downloadLink.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
};
