import axios from 'axios';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

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
    console.log(response.data);
    return response.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const handleError = (error) => {
  console.error('Error performing API request:', error);
  throw error;
};
