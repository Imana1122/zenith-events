import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEvents, selectEvent, selectEventDetails } from '../../redux/eventSlice';
import EventCard from '../../components/Home/EventCard';
import BlueBanner from '../../components/Home/BlueBanner';
import HeroSection from '../../components/Home/HeroSection';
import BookEventsSection from '../../components/Home/BookEventsSection';
import EventFeature from '../../components/Home/EventFeature';
import axiosClient from '../../axios';
import { toast } from 'react-hot-toast';

function Home() {
  // Get the events state from the Redux store or set it to an empty array if not available
  const eventsState = useSelector((state) => state.event.events) || [];
  // State to store a limited number of events to display on the homepage
  const [limitedEvents, setLimitedEvents] = useState([]);

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

  // Update limitedEvents when eventsState changes to show only the first five events
  useEffect(() => {
    setLimitedEvents(eventsState.slice(0, 5));
  }, [eventsState]);

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
    <div className="p-2">
      <div className="hidden md:grid">
        <div className="border border-black h-[400px]">
          <div
            className="bg-cover bg-center h-full"
            style={{
              backgroundImage: `url('https://th.bing.com/th/id/OIP.XrqS9DAvEu3iNYzhmCNVEwHaD0?w=287&h=179&c=7&r=0&o=5&pid=1.7')`,
            }}
          ></div>
        </div>
        <HeroSection />
      </div>
      <div className="grid md:flex md:flex-row md:space-x-10 justify-center items-inline flex-wrap xl:px-30">
        {/* Render event cards if eventsState contains data, otherwise show loading message */}
        {eventsState.length > 0 ? (
          limitedEvents.map((event) => (
            <EventCard key={event.id} event={event} handleClick={handleClick} />
          ))
        ) : (
          <p className="text-xl my-5 text-green-700 font-light">Loading ....</p>
        )}
      </div>
      <div className="hidden md:grid">
        <BookEventsSection />
        <EventFeature />
        <BlueBanner />
      </div>
    </div>
  );
}

export default Home;
