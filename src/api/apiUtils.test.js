import axios from 'axios';
import { performApiRequest, handleResponse, handleError } from './apiUtils';
import { getAccessToken } from '../auth/msalInstance';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

jest.mock('axios');
jest.mock('../auth/msalInstance', () => ({
  getAccessToken: jest.fn()
}));

describe('API Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('performApiRequest', () => {
    test('should make a GET request to the correct URL', async () => {
      const mockResponseData = { id: 1, message: 'welcome' };
      const mockUrl = 'data';
      const mockBaseUrl = BASE_API_URL;
      axios.mockResolvedValueOnce({ status: 200, data: mockResponseData });

      const response = await performApiRequest(mockUrl, 'GET');

      expect(axios).toHaveBeenCalledWith({
        url: `${mockBaseUrl}/${mockUrl}`,
        method: 'GET',
        data: undefined,
        responseType: undefined
      });
      expect(response).toEqual(mockResponseData);
    });

    test('should handle errors properly', async () => {
      const errorMessage = 'Failed to fetch data';
      axios.mockRejectedValueOnce(new Error(errorMessage));

      await expect(performApiRequest('users/1', 'GET')).rejects.toThrow(errorMessage);
    });
    test('should setup axios request and response interceptors', () => {
      setTimeout(() => {
        expect(axios.interceptors.request.use).toHaveBeenCalled();
        expect(axios.interceptors.request.use.mock.calls[0][0]).toBeInstanceOf(Function);
        expect(axios.interceptors.request.use.mock.calls[0][1]).toBeInstanceOf(Function);

        expect(axios.interceptors.response.use).toHaveBeenCalled();
        expect(axios.interceptors.response.use.mock.calls[0][0]).toBeInstanceOf(Function);
        expect(axios.interceptors.response.use.mock.calls[0][1]).toBeInstanceOf(Function);
      }, 100);
    });
  });

  describe('handleResponse', () => {
    test('should return response data if status is between 200 and 299', () => {
      const responseData = { id: 1, name: 'John' };
      const response = { status: 200, data: responseData };

      expect(handleResponse(response)).toEqual(responseData);
    });

    test('should throw an error if status is not between 200 and 299', () => {
      const response = { status: 404 };

      expect(() => handleResponse(response)).toThrowError(`HTTP error! Status: ${response.status}`);
    });
  });

  describe('handleError', () => {
    test('should log the error and throw it', () => {
      const error = new Error('Failed to perform API request');
      console.error = jest.fn();

      expect(() => handleError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith('Failed to perform API request:', error);
    });
  });

  describe('Request Interceptor', () => {
    test('add authorization header with token', async () => {
      const accessToken = 'mockAccessToken';
      getAccessToken.mockResolvedValueOnce({ accessToken });
      const requestConfig = { headers: {} };
      axios.interceptors.request.use(async (callback) => {
        const config = await callback(requestConfig);
        expect(config.headers.Authorization).toBe(`Bearer ${accessToken}`);
        return config;
      });
    });
  });
});
