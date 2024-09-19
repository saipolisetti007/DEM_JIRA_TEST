import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Create a Redux store using the configureStore function
const store = configureStore({
  reducer: rootReducer // Set the root reducer for the store
});

// Export the store as the default export
export default store;
