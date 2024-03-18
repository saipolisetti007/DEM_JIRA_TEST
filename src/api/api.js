import { performApiRequest } from './apiUtils';

export const getData = async () => {
  return await performApiRequest('/tabledata');
};

export const getCategories = async () => {
  return await performApiRequest('/category');
};

export const getBrands = async () => {
  return await performApiRequest('/brand');
};
export const getSubsectors = async () => {
  return await performApiRequest('/subsector');
};
