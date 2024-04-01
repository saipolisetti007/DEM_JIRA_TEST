import axios from 'axios';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

//Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // console.log('Making request:', config);
    return config;
  },
  (error) => {
    // console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // console.log('Response received:', response);
    return response;
  },
  (error) => {
    //console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const performApiRequest = async (url, method = 'GET', data = null, responseType) => {
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
