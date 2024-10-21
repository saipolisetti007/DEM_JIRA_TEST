import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries } from '../../api/promoGridApi';

type CountryStateType = {
  countriesData: string[];
  isLoading: boolean;
  error: string | null | undefined;
};
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
    countriesData: JSON.parse(sessionStorage.getItem('countriesData') || '[]'), // Initialize with data from sessionStorage or empty array
    isLoading: false,
    error: null
  } as CountryStateType,
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
        sessionStorage.setItem('countriesData', JSON.stringify(action.payload)); // Save to session Storage
      })
      // Handle rejected state of fetchCountries
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default countryCodeSlice.reducer;
