import { performApiRequest } from './apiUtils';

export const getHealth = async () => {
  return performApiRequest('/health-check');
};
