import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries } from '../../api/promoGridApi';

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
    countriesData: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countriesData = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default countryCodeSlice.reducer;
