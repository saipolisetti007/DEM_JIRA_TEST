import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/promoGridApi';

export const fecthUserProfile = createAsyncThunk('api/fetchUserProfile', async () => {
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
      .addCase(fecthUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fecthUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userProfileSlice.reducer;
