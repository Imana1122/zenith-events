import React from "react";
import TButton from "../core/TButton";

export const EventListItem = ({ event, onDeleteClick , booking}) => {
  const onUpdateClick = () => {
    // Navigate to the update event page with mode set to "update"
    window.location.href = `/events/update/${event.id}`;
  };

  return (
    <div className="rounded shadow-md shadow-slate-500 p-4 mb-10 cursor-pointer">
      <img
        src={event.imagePath}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h4 className="mt-4 text-lg font-bold">{event.title}</h4>
      <p>{event.address}</p>
      <p>{event.start_date} to {event.end_date}</p>
      <p>Number of People: {booking.noOfPeople}</p>
      <p>Number of People: {booking.totalAmount}</p>

      <div className="flex justify-between items-center mt-3">


            <TButton onClick={() => onDeleteClick({bookingId:booking.id})} color="red">
                Remove

            </TButton>


      </div>
    </div>
  );
};
