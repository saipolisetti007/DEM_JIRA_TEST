import axios from 'axios';
import { getAccessToken } from '../auth/msalInstance';
// Base API URL from environment variables
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

// Add a request interceptor to axios
axios.interceptors.request.use(
  async (config) => {
    // Retrieve token and expiration from session storage
    let token = sessionStorage.getItem('accessToken');
    let expiration = sessionStorage.getItem('accessTokenExpiration');
    const customerId = localStorage.getItem('customerId'); // Retrieve customer ID from local storage
    // If no token or token is expired, get a new access token
    if (!token || (expiration && new Date(expiration) <= new Date())) {
      token = await getAccessToken();
    }
    // If token exists, Set the Authorization header with the access token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (customerId) {
      config.headers['CustomerID'] = customerId; // Add customer ID to headers
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to axios
axios.interceptors.response.use(
  (response) => {
    // Simply return the response if successful
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

/**
 * Perform an API request using axios
 * @param {string} url - The endpoint URL
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @param {object} data - The request payload
 * @param {string} responseType - The expected response type
 * @returns {Promise} - The response data or error
 */

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

/**
 * Handle the API response
 * @param {object} response - The axios response object
 * @returns {object} - The response data
 * @throws {Error} - If the response status is not in the 2xx range
 */

export const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

/**
 * Handle any errors from the API request
 * @param {Error} error - The error object
 * @throws {Error} - The same error object after logging
 */

export const handleError = (error) => {
  console.error('Failed to perform API request:', error);
  throw error;
};
