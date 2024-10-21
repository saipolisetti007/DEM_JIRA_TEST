import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents } from '../../api/promoGridApi';

type eventDataType = {
  eventsData: Record<string, string[]>;
  eventTypeOptions: string[];
  isLoading: boolean;
  error: string | null | undefined;
};

/**
 * Async thunk to fetch events data from the API.
 * @param {string} customerId - The customer ID to fetch events for.
 * @param {Object} thunkAPI - The thunk API object.
 * @returns {Promise<Object>} - The fetched events data.
 */
export const fetchEvents = createAsyncThunk(
  'api/fecthEvents',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const response = await getEvents(customerId);
      return response.events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Slice to manage events data state.
 */
const eventsSlice = createSlice({
  name: 'eventsData',
  initialState: {
    eventsData: {},
    eventTypeOptions: [],
    isLoading: false,
    error: null
  } satisfies eventDataType as eventDataType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending and fulfilled states.
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle pending and rejected states.
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsData = action.payload;
        state.eventTypeOptions = Object.keys(action.payload);
      })
      // Handle pending and rejected states.
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default eventsSlice.reducer;
