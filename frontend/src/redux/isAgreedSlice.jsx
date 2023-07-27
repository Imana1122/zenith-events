import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAgreed: localStorage.getItem('isAgreed') === 'true' ? true : false,
};

const isAgreedSlice = createSlice({
  name: 'isAgreed',
  initialState,
  reducers: {
    setIsAgreed: (state, action) => {
      state.isAgreed = action.payload;
      localStorage.setItem('isAgreed', action.payload.toString());
    },
  },
});

export const { setIsAgreed } = isAgreedSlice.actions;

export default isAgreedSlice.reducer;
