import { createSlice } from '@reduxjs/toolkit';

const storedCount = localStorage.getItem('count');

const initialState = {
  count: storedCount ? JSON.parse(storedCount) : 1,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increaseCount: (state) => {
        console.log(state.count)
      state.count += 1;
      localStorage.setItem('count', JSON.stringify(state.count));
    },
    decreaseCount: (state) => {
        console.log(state.count)
      if (state.count > 1) {
        state.count -= 1;
        localStorage.setItem('count', JSON.stringify(state.count));
      }
    },
    resetCount: (state) => {
      state.count = initialState.count;
      localStorage.removeItem('count');
    },
  },
});

export const { increaseCount, decreaseCount, resetCount } = countSlice.actions;
export default countSlice.reducer;
