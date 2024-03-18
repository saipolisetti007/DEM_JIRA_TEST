import { combineReducers } from '@reduxjs/toolkit';
import storeDataReducer from '../components/StoreToDcMapping/storeDcSlice';

const rootReducer = combineReducers({
  storeData: storeDataReducer
});

export default rootReducer;
