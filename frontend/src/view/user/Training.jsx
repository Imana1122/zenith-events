import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axiosClient from '../../axios';
import { selectEvent, selectEventDetails, setEvents } from '../../redux/eventSlice';
import EventCard from '../../components/home/EventCard';


export const Training = () => {
  // Get the events state from the Redux store or set it to an empty array if not available
  const eventsState = useSelector((state) => state.event.events) || [];

  // Get the navigate function from react-router-dom for programmatic navigation
  const navigate = useNavigate();

  // Get the dispatch function from react-redux for dispatching actions
  const dispatch = useDispatch();

  // Fetch events from the server when the component mounts
  useEffect(() => {
    axiosClient
      .get('/events') // Replace with the correct API endpoint
      .then((response) => {
        // Dispatch the setEvents action with the fetched events data
        dispatch(setEvents(response.data.events));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  // Event handler for when an event card is clicked
  const handleClick = async ({ eventId, event }) => {
    // Dispatch the selectEvent action with the selected event ID
    dispatch(selectEvent(eventId));

    // Introduce a delay of 2 seconds (just for demonstration)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dispatch the selectEventDetails action with the selected event data
    dispatch(selectEventDetails(event));

    // Navigate to the event details page
    navigate(`/event/${event.title}`);
  };

  return (
    <div className="grid md:flex md:flex-row md:space-x-10 justify-center items-inline flex-wrap xl:px-30">
      {/* Render event cards if eventsState contains data, otherwise show loading message */}
      {eventsState.length > 0 ? (
        eventsState.map((event) => (
          <EventCard key={event.id} event={event} handleClick={handleClick} />
        ))
      ) : (
        <p className="text-xl my-5 text-green-700 font-light">Loading ....</p>
      )}
    </div>
  );
};
