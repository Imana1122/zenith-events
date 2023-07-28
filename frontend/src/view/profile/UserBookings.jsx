import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { EventListItem } from '../../components/Events/EventListItem';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

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
          {userBookings ? (
            userBookings.length === 0 ? (
              <div className='flex flex-col justify-between items-center my-10'>
                <p className='text-xl my-5 text-red-700 font-light'>
                No bookings for you
                </p>
                <p className='text-black'>
                  Book your events <Link to={'/'} className='text-green-600 font-bold'>here.</Link>
                </p>
              </div>

            ) : (
              userBookings.map((booking) => (
                <EventListItem
                  key={booking.id}
                  event={booking.event}
                  booking={booking}
                  onDeleteClick={deleteBooking}
                />
              ))
            )
          ) : (
            <p className='text-xl my-5 text-green-700 font-light'>Loading ....</p>
          )}
        </div>
      );

}
