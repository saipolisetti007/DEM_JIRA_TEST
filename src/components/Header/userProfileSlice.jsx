import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/promoGridApi';

export const fetchUserProfile = createAsyncThunk('api/fetchUserProfile', async () => {
  let userData = await getUserProfile();
  return userData;
});

const userProfileSlice = createSlice({
  name: 'userProfileData',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
    customerId: null
  },
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.customerId = action.payload.customers && Object.keys(action.payload.customers)[0];
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
export const { setCustomerId } = userProfileSlice.actions;
export default userProfileSlice.reducer;
