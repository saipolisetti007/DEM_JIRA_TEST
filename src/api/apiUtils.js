import axios from 'axios';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
