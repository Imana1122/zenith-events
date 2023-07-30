import { createSlice } from '@reduxjs/toolkit';

// Retrieve the selected event from localStorage
const storedEvent = localStorage.getItem('selectedEvent');

// Set the initial state of the events and selectedEvent
const initialState = {
  events: [],
  selectedEventId: 0,
  selectedEvent: storedEvent ? JSON.parse(storedEvent) : null,
};

// Create a slice of the state for events and selectedEvent
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Reducer to set the list of events
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    // Reducer to update the selectedEventId
    selectEvent: (state, action) => {
      const selectedEventId = action.payload;
      state.selectedEventId = selectedEventId;
    },
    // Reducer to update the selectedEvent and store it in localStorage
    selectEventDetails: (state, action) => {
      const selectedEvent = action.payload;
      state.selectedEvent = selectedEvent;
      // Clear previously selected event from local storage
      localStorage.removeItem('selectedEvent');
      // Save new selected event to local storage
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    },
    // Reducer to clear the selectedEvent and remove it from localStorage
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      // Remove selected event from local storage
      localStorage.removeItem('selectedEvent');
    },
  },
});

// Extract the action creators from the slice
export const { setEvents, selectEvent, selectEventDetails, clearSelectedEvent } = eventSlice.actions;

// Export the reducer function
export default eventSlice.reducer;
