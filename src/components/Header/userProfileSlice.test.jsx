import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer, { fetchUserProfile } from './userProfileSlice';
import { getUserProfile } from '../../api/promoGridApi';

jest.mock('../../api/promoGridApi');

describe('userProfileSlice', () => {
  const initialState = {
    userData: null,
    status: 'idle',
    error: null,
    customerId: null
  };

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        userProfileData: userProfileReducer
      }
    });
  });

  it('should return userData when fetchUserProfile is fulfilled', async () => {
    const userData = {
      name: 'John Doe',
      age: 30,
      customers: { 2000038335: 'Costco', 2000000000: 'Dummy Customer' }
    };
    const customerId = '2000000000';
    getUserProfile.mockResolvedValueOnce(userData);

    await store.dispatch(fetchUserProfile());

    const state = store.getState().userProfileData;
    expect(state.status).toBe('succeeded');
    expect(state.userData).toEqual(userData);
    expect(state.customerId).toEqual(customerId);
  });

  it('should set state.status to "succeeded" and update userData when fetchUserProfile is fulfilled', async () => {
    const userData = {
      name: 'John Doe',
      age: 30,
      customers: { 2000038335: 'Costco', 2000000000: 'Dummy Customer' }
    };
    getUserProfile.mockResolvedValueOnce(userData);

    await store.dispatch(fetchUserProfile());

    const state = store.getState().userProfileData;
    expect(state.status).toBe('succeeded');
    expect(state.userData).toEqual(userData);
  });

  it('should set state.status to "failed" and set error message when fetchUserProfile is rejected', async () => {
    const errorMessage = 'Failed to fetch user profile';
    getUserProfile.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(fetchUserProfile());

    const state = store.getState().userProfileData;
    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });
});
