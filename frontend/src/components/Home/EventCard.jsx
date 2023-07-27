import React from 'react';

const EventCard = ({ event, handleClick, }) => {
  return (

      <div className="rounded shadow-md shadow-slate-500 p-4 mb-10 cursor-pointer " onClick={() => handleClick({eventId:event.id, event:event})}>
        <div className="relative">
          <img src={event.imagePath} alt={event.title} className="rounded w-[350px] h-[200px]" />
          <div className="absolute bottom-0 left-4 right-4 bg-purple-900 text-white px-2 py-1 rounded-t-full text-center md:hidden">
            <p className="text-sm">NRs.{event.price}</p>
          </div>
        </div>
        <div className='text-left'>
          <h2 className="text-2xl font-semibold mb-4 text-left text-purple-900 ">{event.title}</h2>
          <div className='md:flex md:items-center md:justify-between'>
            <p className='text-gray-600'><span className='md:hidden'>Date: </span>{event.start_date} to {event.end_date}</p>
            <p className="text-gray-600"><span className='md:hidden'>Location: </span>{event.address}</p>
          </div>
          <div className='md:flex md:items-center md:space-x-5'>
          <div className="hidden md:grid md:border md:border-gray-400 md:rounded-lg md:py-2 md:px-4 md:w-fit">
              <p className="text-lg font-semibold text-red-500">NRs.{event.price}</p>
        </div>
            <p className="text-gray-600 hidden md:block">{event.type}</p>
          </div>

        </div>
      </div>

  );
};

export default EventCard;
