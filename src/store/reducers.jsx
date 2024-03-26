import { combineReducers } from '@reduxjs/toolkit';
import storeDataReducer from '../components/StoreToDcMapping/storeDcSlice';
import promoGridReducer from '../components/PromoGrid/promoGridSlice';

const rootReducer = combineReducers({
  storeData: storeDataReducer,
  promoData: promoGridReducer
});

export default rootReducer;
