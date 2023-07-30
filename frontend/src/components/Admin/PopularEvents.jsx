import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { Link } from 'react-router-dom';

const PopularEvents = () => {
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    // Fetch popular events data from the server
    axiosClient
      .get('/getMostBookedEvents') // Replace with the correct API endpoint
      .then((response) => {
        setPopularEvents(response.data.popularEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]'>
      <strong className='text-gray-700 font-medium'>Popular Events</strong>
      <div className='mt-4 flex flex-col gap-3'>
        {popularEvents.length > 0 ? (
          // If there are popular events available, map through the array and display them
          popularEvents.map((event) => (
            <Link to={`/events/${event.eventId}`} className='flex hover:no-underline cursor-pointer' key={event.id}>
              <div className='w-10 h-10 minw-10 bg-gray-200 rounded-sm'>
                <img className='w-full h-full object-cover' src={event.imagePath} alt={event.workshop} />
              </div>
              <div className='ml-4 flex-1'>
                <p className='text-sm text-gray-800'>{event.workshop}</p>
                <span className='text-sm font-medium text-sky-500'>{event.title}</span>
              </div>
              <div className='text-xs text-gray-800 pl-2'>
                NRs. {event.price}
              </div>
            </Link>
          ))
        ) : (
          // If there are no popular events available, display a message
          <div>No popular events available</div>
        )}
      </div>
    </div>
  );
};

export default PopularEvents;
