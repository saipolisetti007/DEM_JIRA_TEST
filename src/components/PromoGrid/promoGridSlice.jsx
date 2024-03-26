import { createSlice } from '@reduxjs/toolkit';

const promoDataSlice = createSlice({
  name: 'promoData',
  initialState: {
    promoData: []
  },
  reducers: {
    addPromoData: (state, action) => {
      state.promoData.push(action.payload);
    },
    editPromoData: (state, action) => {
      state.promoData = state.promoData.map((row) => {
        if (row.id === action.payload.id) {
          return action.payload.newData;
        }
        return row;
      });
    },
    deletePromoData: (state, action) => {
      state.promoData = state.promoData.filter((row) => row.id !== action.payload);
    },
    setPromoData: (state, action) => {
      state.promoData = action.payload;
    }
  }
});

export const { addPromoData, editPromoData, deletePromoData, setPromoData } =
  promoDataSlice.actions;

export default promoDataSlice.reducer;
