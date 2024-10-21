import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Create a Redux store using the configureStore function
const store = configureStore({
  reducer: rootReducer // Set the root reducer for the store
});

// Export the store as the default export
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
