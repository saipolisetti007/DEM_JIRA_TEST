import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents } from '../../api/promoGridApi';

export const fecthEvents = createAsyncThunk(
  'api/fecthEvents',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await getEvents(customerId);
      return response.events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'eventsData',
  initialState: {
    eventsData: {},
    eventTypeOptions: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsData = action.payload;
        state.eventTypeOptions = Object.keys(action.payload);
      })
      .addCase(fecthEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default eventsSlice.reducer;
