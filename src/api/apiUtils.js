import axios from 'axios';
import { getAccessToken } from '../auth/msalInstance';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem('accessToken');
    let expiration = sessionStorage.getItem('accessTokenExpiration');
    const customerId = localStorage.getItem('customerId'); // Retrieve customer ID from local storage
    if (!token || (expiration && new Date(expiration) <= new Date())) {
      token = await getAccessToken();
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (customerId) {
      config.headers['CustomerID'] = customerId; // Add customer ID to headers
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const performApiRequest = async (url, method, data, responseType) => {
  try {
    const response = await axios({
      url: `${BASE_API_URL}/${url}`,
      method,
      data,
      responseType
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const handleError = (error) => {
  console.error('Failed to perform API request:', error);
  throw error;
};
