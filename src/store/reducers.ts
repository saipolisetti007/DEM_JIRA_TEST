import { combineReducers } from '@reduxjs/toolkit';
import userProfileSlice from '../components/Header/userProfileSlice';
import eventsSlice from '../components/PromoGrid/eventsSlice';
import settingsSlice from '../components/PromoGrid/settingsSlice';
import countryCodeSlice from '../components/PromoGrid/countryCodeSlice';

// Combine the individual slice reducers into a single root reducer
const rootReducer = combineReducers({
  userProfileData: userProfileSlice, // Assign the user profile slice reducer to the userProfileData key
  eventsData: eventsSlice, // Assign the events slice reducer to the eventsData key
  settingsData: settingsSlice, // Assign the settings slice reducer to the settingsData key
  countriesData: countryCodeSlice // Assign the country code slice reducer to the countriesData key
});

// Export the root reducer as the default export
export default rootReducer;
