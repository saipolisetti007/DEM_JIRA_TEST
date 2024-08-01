import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from '../components/Header/userProfileSlice';
import eventsSlice from '../components/PromoGrid/eventsSlice';
import settingsSlice from '../components/PromoGrid/settingsSlice';
import countryCodeSlice from '../components/PromoGrid/countryCodeSlice';

const rootReducer = combineReducers({
  userProfileData: userProfileSlice,
  eventsData: eventsSlice,
  settingsData: settingsSlice,
  countriesData: countryCodeSlice
});

export default rootReducer;
