import { createSlice } from '@reduxjs/toolkit';

const storeDataSlice = createSlice({
  name: 'storeData',
  initialState: {
    storeData: []
  },
  reducers: {
    addStoreData: (state, action) => {
      state.storeData.push(action.payload);
    },
    editStoreData: (state, action) => {
      state.storeData = state.storeData.map((row) => {
        if (row.id === action.payload.id) {
          return action.payload.newData;
        }
        return row;
      });
    },
    deleteStoreData: (state, action) => {
      state.storeData = state.storeData.filter((row) => row.id !== action.payload);
    },
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    }
  }
});

export const { addStoreData, editStoreData, deleteStoreData, setStoreData } =
  storeDataSlice.actions;

export default storeDataSlice.reducer;
