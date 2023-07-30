import { createSlice } from '@reduxjs/toolkit';

// Retrieve the count value from localStorage
const storedCount = localStorage.getItem('count');

// Set the initial state of the count
const initialState = {
  count: storedCount ? JSON.parse(storedCount) : 1,
};

// Create a slice of the state for count
const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    // Reducer to increase the count
    increaseCount: (state) => {
      state.count += 1;
      // Update the count value in localStorage
      localStorage.setItem('count', JSON.stringify(state.count));
    },
    // Reducer to decrease the count
    decreaseCount: (state) => {
      if (state.count > 1) {
        state.count -= 1;
        // Update the count value in localStorage
        localStorage.setItem('count', JSON.stringify(state.count));
      }
    },
    // Reducer to reset the count to its initial state
    resetCount: (state) => {
      state.count = initialState.count;
      // Remove the count value from localStorage
      localStorage.removeItem('count');
    },
  },
});

// Extract the action creators from the slice
export const { increaseCount, decreaseCount, resetCount } = countSlice.actions;

// Export the reducer function
export default countSlice.reducer;
