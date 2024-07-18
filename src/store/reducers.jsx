import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from '../components/Header/userProfileSlice';
import eventsSlice from '../components/PromoGrid/eventsSlice';
import settingsSlice from '../components/PromoGrid/settingsSlice';

const rootReducer = combineReducers({
  userProfileData: userProfileSlice,
  eventsData: eventsSlice,
  settingsData: settingsSlice
});

export default rootReducer;
