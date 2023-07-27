import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEvents, selectEvent, selectEventDetails } from '../redux/eventSlice';
import EventCard from '../components/Home/EventCard';
import EventDetails from './EventDetails';
import BlueBanner from '../components/Home/BlueBanner';
import HeroSection from '../components/Home/HeroSection';
import BookEventsSection from '../components/Home/BookEventsSection';
import ZenithEventsLogo from '../assets/zenitheventslogo.svg';
import EventFeature from '../components/Home/EventFeature';
import axiosClient from '../axios';
import { toast } from 'react-hot-toast';

function Home() {
const eventsState = useSelector((state) => state.event.events) || [];


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosClient
      .get('/events') // Replace with the correct API endpoint
      .then((response) => {
        console.log(response.data.events)
        dispatch(setEvents(response.data.events));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);



  const handleClick = async ({eventId, event}) => {
    dispatch(selectEvent(eventId));

    toast('loading....')

    // Introduce a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));

dispatch(selectEventDetails(event))

      navigate(`/event/${event.title}`);

  };


  return (
    <div className="p-2">
      <div className="hidden md:grid">
        <div className="border border-black h-[400px]">
          <div
            className="bg-cover bg-center h-full"
            style={{ backgroundImage: `url(${'https://th.bing.com/th/id/OIP.XrqS9DAvEu3iNYzhmCNVEwHaD0?w=287&h=179&c=7&r=0&o=5&pid=1.7'})` }}
          ></div>
        </div>
        <HeroSection />
      </div>
      <div className="grid md:flex md:flex-row md:space-x-10 justify-center items-inline flex-wrap xl:px-30">
        {eventsState.length > 0 ? (
          eventsState.map((event) => (
            <EventCard key={event.id} event={event} handleClick={handleClick} />
          ))
        ) : (
          <p>No events available.</p>
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
