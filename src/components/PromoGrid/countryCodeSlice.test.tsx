import { configureStore } from '@reduxjs/toolkit';
import countriesReducer, { fetchCountries } from './countryCodeSlice';
import { getCountries } from '../../api/promoGridApi';

jest.mock('../../api/promoGridApi');

describe('countryCodeSlice', () => {
  const initialState = {
    countriesData: [],
    isLoading: false,
    error: null
  };
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        countriesData: countriesReducer
      },
      preloadedState: {
        countriesData: initialState
      }
    });
  });

  test('should return initial state', () => {
    expect(store.getState().countriesData).toEqual(initialState);
  });
  it('should handle fetchCountries pending', async () => {
    (getCountries as jest.Mock).mockReturnValue(Promise.resolve({ events: [] }));
    store.dispatch(fetchCountries());
    expect(store.getState().countriesData.isLoading).toBe(true);
    expect(store.getState().countriesData.error).toBe(null);
  });

  it('should handle fetchCountries rejected', async () => {
    const error = new Error('Rejected');
    (getCountries as jest.Mock).mockReturnValue(Promise.reject(error));
    await store.dispatch(fetchCountries());
    expect(store.getState().countriesData.isLoading).toBe(false);
    expect(store.getState().countriesData.error).toBe(error.message);
  });
});
