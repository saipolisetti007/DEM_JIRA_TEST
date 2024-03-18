import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('Making request:', config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const performApiRequest = async (url, method = 'GET', data = null) => {
  try {
    const response = await api.request({
      url,
      method,
      data
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
  console.error('Error performing API request:', error);
  throw error;
};
