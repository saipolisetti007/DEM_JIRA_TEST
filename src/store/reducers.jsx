import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from '../components/Header/userProfileSlice';
import eventsSlice from '../components/PromoGrid/eventsSlice';

const rootReducer = combineReducers({
  userProfileData: userProfileSlice,
  eventsData: eventsSlice
});

export default rootReducer;
