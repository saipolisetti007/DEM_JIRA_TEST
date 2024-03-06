import { performApiRequest } from './apiUtils';

export const getHealth = async () => {
  return await performApiRequest('/health-check');
};

export const getMessage = async () => {
  return await performApiRequest('/get_data');
};
