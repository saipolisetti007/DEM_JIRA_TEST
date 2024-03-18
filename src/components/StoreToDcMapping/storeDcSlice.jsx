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
      const { id, newData } = action.payload;
      const index = state.storeData.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.storeData[index] = { ...state.storeData[index], ...newData };
      }
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
