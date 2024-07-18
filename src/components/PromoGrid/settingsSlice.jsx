import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promoGridColumnCreate, promoGridColumnSettings } from '../../api/promoGridApi';

// Async thunk for fetching settings
export const getSettings = createAsyncThunk(
  'promogrid/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await promoGridColumnSettings();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching settings
export const updateSettings = createAsyncThunk(
  'promogrid/updateSettings',
  async (newSettings, { rejectWithValue }) => {
    try {
      const response = await promoGridColumnCreate(newSettings);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settingsData',
  initialState: {
    settings: {},
    isLoading: false,
    error: null
  },

  reducers: {
    toggleSetting(state, action) {
      const field = action.payload;
      state.settings[field] = !state.settings[field];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = {
          ...state.settings,
          ...action.payload
        };
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { toggleSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
