import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import countReducer from './countSlice';
import isAgreedReducer from './isAgreedSlice';

const store = configureStore({
  reducer: {
    event: eventReducer,
    count: countReducer,
    isAgreed: isAgreedReducer
  },
});

export default store;
