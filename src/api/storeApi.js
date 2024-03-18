import { performApiRequest } from './apiUtils';
import {
  addStoreData,
  editStoreData,
  deleteStoreData
} from '../components/StoreToDcMapping/storeDcSlice';

export const getData = async () => {
  return await performApiRequest('/tabledata');
};

export const addNewRowData = (rowData) => async (dispatch) => {
  const response = await performApiRequest('/tabledata', 'POST', rowData);
  dispatch(addStoreData(response));
};

export const updateRowData = (id, newData) => async (dispatch) => {
  const response = await performApiRequest(`/tabledata/${id}`, 'PUT', newData);
  dispatch(editStoreData({ id, newData: response }));
};

export const deleteRowData = (id) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const response = await performApiRequest(`/tabledata/${id}`, 'DELETE');
  dispatch(deleteStoreData(id));
};
