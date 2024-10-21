import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/promoGridApi';

type UserProfileStateType = {
  userData: any | null;
  status: string;
  error: string | null;
  customerId: string | null;
  fetchAttempted: boolean;
};

// Async thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk(
  'api/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      let userData = await getUserProfile();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfileData',
  initialState: {
    userData: JSON.parse(sessionStorage.getItem('userData') || 'null'), // Initial user data from sessionStorage or 'null'
    status: 'idle',
    error: null,
    fetchAttempted: false,
    customerId: sessionStorage.getItem('customerId') || null // Initial customer ID from sessionStorage or null
  } as UserProfileStateType,
  reducers: {
    // Reducer to set customer ID and store it in sessionStorage
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
      sessionStorage.setItem('customerId', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state of fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle fulfilled state of fetchUserProfile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.fetchAttempted = true;
        sessionStorage.setItem('userData', JSON.stringify(action.payload));
        if (!state.customerId && action.payload.customers) {
          state.customerId = Object.keys(action.payload.customers)[0];
          sessionStorage.setItem('customerId', state.customerId);
        }
      })
      // Handle rejected state of fetchUserProfile
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
        state.fetchAttempted = true;
      });
  }
});

export const { setCustomerId } = userProfileSlice.actions;
export default userProfileSlice.reducer;
