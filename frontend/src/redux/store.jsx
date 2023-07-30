import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import countReducer from './countSlice';
import isAgreedReducer from './isAgreedSlice';

// Configure the Redux store with multiple reducers
const store = configureStore({
  reducer: {
    // Add each slice reducer to the store with a corresponding key
    event: eventReducer,      // Reducer for managing event state
    count: countReducer,      // Reducer for managing count state
    isAgreed: isAgreedReducer // Reducer for managing isAgreed state
  },
});

// Export the configured Redux store
export default store;
