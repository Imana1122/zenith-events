import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { EventListItem } from '../../components/Events/EventListItem';
import { toast } from 'react-hot-toast';

export const UserBookings = () => {

    const [userBookings, setUserBookings] = useState();

    useEffect(() => {
        axiosClient.get('/getUserEvents')
          .then((response) => {
            setUserBookings(response.data.bookings);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


      const deleteBooking = ({ bookingId }) => {
        axiosClient
          .delete(`/deleteSpecificUserBooking/${bookingId}`)
          .then((response) => {
            console.log(response);
            toast(response.data.success)
            const successMessage = response.data.success;
            if(successMessage){

            axiosClient.get('/getUserEvents')
              .then((response) => {
                setUserBookings(response.data.bookings);
              })
              .catch((error) => {
                console.log(error);
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };


  return (
    <div className='grid md:flex md:flex-row md:space-x-10 justify-center items-inline flex-wrap xl:px-30'>
  {userBookings ? userBookings.map((booking) => (
    <EventListItem key={booking.id} event={booking.event} booking={booking} onDeleteClick={deleteBooking} />
  )) : (
    <p>No bookings for you</p>
  )}
</div>

  )
}
