import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/promoGridApi';

// Async thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk('api/fetchUserProfile', async () => {
  let userData = await getUserProfile();
  return userData;
});

const userProfileSlice = createSlice({
  name: 'userProfileData',
  initialState: {
    userData: JSON.parse(localStorage.getItem('userData')) || null, // Initial user data from localStorage or null
    status: 'idle',
    error: null,
    customerId: localStorage.getItem('customerId') || null // Initial customer ID from localStorage or null
  },
  reducers: {
    // Reducer to set customer ID and store it in localStorage
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
      localStorage.setItem('customerId', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state of fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      // Handle fulfilled state of fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload));
        if (!state.customerId && action.payload.customers) {
          state.customerId = Object.keys(action.payload.customers)[0];
          localStorage.setItem('customerId', state.customerId);
        }
      })
      // Handle rejected state of fetchUserProfile
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCustomerId } = userProfileSlice.actions;
export default userProfileSlice.reducer;
