import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { getSettings, updateSettings } from './settingsSlice';
import { promoGridColumnCreate, promoGridColumnSettings } from '../../api/promoGridApi';

jest.mock('../../api/promoGridApi');

describe('Settings Slice', () => {
  const initialState = {
    settings: {},
    isLoading: false,
    error: null
  };
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        settingsData: settingsReducer
      },
      preloadedState: {
        settingsData: initialState
      }
    });
  });

  test('should return initial state', () => {
    expect(store.getState().settingsData).toEqual(initialState);
  });
  it('should handle getSettings pending', async () => {
    (promoGridColumnSettings as jest.Mock).mockResolvedValue({});
    store.dispatch(getSettings());
    expect(store.getState().settingsData.isLoading).toBe(true);
    expect(store.getState().settingsData.error).toBe(null);
  });

  it('should handle getSettings rejected', async () => {
    const error = new Error('Rejected');
    (promoGridColumnSettings as jest.Mock).mockRejectedValue(error);
    await store.dispatch(getSettings());
    expect(store.getState().settingsData.isLoading).toBe(false);
    expect(store.getState().settingsData.error).toBe(error.message);
  });

  it('should handle updateSettings pending', async () => {
    const mockSettings = { key: true };
    (promoGridColumnCreate as jest.Mock).mockResolvedValue(mockSettings);
    store.dispatch(updateSettings(mockSettings));
    expect(store.getState().settingsData.isLoading).toBe(true);
    expect(store.getState().settingsData.error).toBe(null);
  });

  it('should handle updateSettings rejected', async () => {
    const error = new Error('Rejected');
    (promoGridColumnCreate as jest.Mock).mockRejectedValue(error);
    await store.dispatch(updateSettings({}));
    expect(store.getState().settingsData.isLoading).toBe(false);
    expect(store.getState().settingsData.error).toBe(error.message);
  });
});
