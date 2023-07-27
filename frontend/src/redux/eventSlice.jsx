import { createSlice } from '@reduxjs/toolkit';
const storedEvent = localStorage.getItem('selectedEvent');

const initialState = {
  events: [],
  selectedEventId:0,
  selectedEvent: storedEvent ? JSON.parse(storedEvent) : null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    selectEvent: (state, action) => {
      const selectedEventId = action.payload;
      state.selectedEventId = selectedEventId;

    },
    selectEventDetails: (state, action) => {
        const selectedEvent = action.payload;
        state.selectedEvent = selectedEvent;
        localStorage.removeItem('selectedEvent'); // Clear previously selected event from local storage
        localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent)); // Save new selected event to local storage
      },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      localStorage.removeItem('selectedEvent'); // Remove selected event from local storage
    },
  },
});

export const { setEvents, selectEvent,selectEventDetails, clearSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;
