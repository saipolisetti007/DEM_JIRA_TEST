import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/promoGridApi';

export const fetchUserProfile = createAsyncThunk('api/fetchUserProfile', async () => {
  const userData = await getUserProfile();
  return userData;
});

const userProfileSlice = createSlice({
  name: 'userProfileData',
  initialState: {
    userData: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userProfileSlice.reducer;
