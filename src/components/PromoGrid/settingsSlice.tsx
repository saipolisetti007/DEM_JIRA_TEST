import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promoGridColumnCreate, promoGridColumnSettings } from '../../api/promoGridApi';

type settingsDataType = {
  settings: Record<string, boolean>;
  isLoading: boolean;
  error: string | undefined | null;
};
// Async thunk for fetching settings
export const getSettings = createAsyncThunk(
  'promogrid/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      // Call the API to get settings
      return await promoGridColumnSettings();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching settings
export const updateSettings = createAsyncThunk(
  'promogrid/updateSettings',
  async (newSettings: Record<string, boolean>, { rejectWithValue }) => {
    try {
      return await promoGridColumnCreate(newSettings);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for settings data
const settingsSlice = createSlice({
  name: 'settingsData',
  initialState: {
    settings: {},
    isLoading: false,
    error: null
  } satisfies settingsDataType as settingsDataType,

  reducers: {
    // Reducer to toggle a specific setting
    toggleSetting(state, action) {
      const field = action.payload;
      state.settings[field] = !state.settings[field];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for getSettings
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      // Handle fulfilled state for getSettings
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      // Handle rejected state for getSettings
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle pending state for updateSettings
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      // Handle fulfilled state for updateSettings
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = {
          ...state.settings,
          ...(typeof action.payload === 'object' && action.payload !== null ? action.payload : {})
        };
      })
      // Handle rejected state for updateSettings
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { toggleSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
