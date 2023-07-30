import { createSlice } from '@reduxjs/toolkit';

// Set the initial state of isAgreed based on the value in localStorage
const initialState = {
  isAgreed: localStorage.getItem('isAgreed') === 'true' ? true : false,
};

// Create a slice of the state for isAgreed
const isAgreedSlice = createSlice({
  name: 'isAgreed',
  initialState,
  reducers: {
    // Reducer to set the value of isAgreed and update it in localStorage
    setIsAgreed: (state, action) => {
      state.isAgreed = action.payload;
      // Store the updated value in localStorage as a string
      localStorage.setItem('isAgreed', action.payload.toString());
    },
  },
});

// Extract the action creator from the slice
export const { setIsAgreed } = isAgreedSlice.actions;

// Export the reducer function
export default isAgreedSlice.reducer;
