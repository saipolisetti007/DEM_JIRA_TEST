import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries } from '../../api/promoGridApi';

// Async thunk to fetch countries data from the API
export const fetchCountries = createAsyncThunk(
  'api/fecthCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCountries();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const countryCodeSlice = createSlice({
  name: 'countriesData',
  initialState: {
    countriesData: JSON.parse(localStorage.getItem('countriesData')) || [], // Initialize with data from local storage or empty array
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state of fetchCountries
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fulfilled state of fetchCountries
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countriesData = action.payload;
        localStorage.setItem('countriesData', JSON.stringify(action.payload)); // Save to local storage
      })
      // Handle rejected state of fetchCountries
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default countryCodeSlice.reducer;
