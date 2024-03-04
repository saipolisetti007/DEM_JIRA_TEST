import axios from "axios";
import { BASE_API_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // adjust as needed
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const performApiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await api.request({
      url,
      method,
      data,
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
  console.error("Error performing API request:", error);
  throw error;
};
