import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import TButton from '../core/TButton';

const RecentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [finishedBookings, setFinishedBookings] = useState([]);
    const [yetToBeBookings, setYetToBeBookings] = useState([]);
    const [ongoingBookings, setOngoingBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axiosClient
      .get('/bookings') // Replace with the correct API endpoint
      .then((response) => {

        setBookings(response.data.bookings);
        setOngoingBookings(response.data.ongoingBookings);
        setYetToBeBookings(response.data.yetToBeBookings);
        setFinishedBookings(response.data.finishedBookings);


      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(()=>{
    filterBookings();
  })



  const handleFilterClick = (status) => {
    setFilter(status);

  };

  const filterBookings = () => {

    switch (filter) {
      case 'finished':
        setFilteredBookings(finishedBookings);


        break;
      case 'ongoing':
        setFilteredBookings(ongoingBookings);

        break;
      case 'yet':
        setFilteredBookings(yetToBeBookings);

        break;
      case '':
        setFilteredBookings(bookings);

        break;
      default:
        setFilteredBookings(bookings);

        break;
    }
  };



  return (
    <>

      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center mb-5">
        <div>
          <TButton
            color="indigo"
            onClick={() => handleFilterClick('')}
            active={filter === ''}
          >
            All
          </TButton>
        </div>
        <div>
          <TButton
            color="red"
            onClick={() => handleFilterClick('finished')}
            active={filter === 'finished'}
          >
            Finished
          </TButton>
        </div>
        <div>
          <TButton
            color='green'
            onClick={() => handleFilterClick('ongoing')}
            active={filter === 'ongoing'}
          >
            Ongoing
          </TButton>
        </div>
        <div>
          <TButton
            color="yellow"
            onClick={() => handleFilterClick('yet')}
            active={filter === 'yet'}
          >
            Yet
          </TButton>
        </div>
      </div>
        <strong className="text-gray-700 font-medium">Recent Bookings</strong>
        <div className="mt-3">
          <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
            <thead className="bg-gray-400">
              <tr>
                <th className="border border-gray-200 p-2">ID</th>
                <th className="border border-gray-200 p-2">CustomerID</th>
                <th className="border border-gray-200 p-2">EventID</th>
                <th className="border border-gray-200 p-2">No. Of People</th>
                <th className="border border-gray-200 p-2">Total Amount</th>
                <th className="border border-gray-200 p-2">Booked Date</th>
                <th className="border border-gray-200 p-2">eSewa Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border border-gray-200 p-2">{booking.id}</td>
                    <td className="border border-gray-200 p-2">
                      <Link to={`users/${booking.userId}`} className="cursor-pointer text-sky-500">
                        {booking.userId}
                      </Link>
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Link to={`events/${booking.eventId}`} className="cursor-pointer text-sky-500">
                        {booking.eventId}
                      </Link>
                    </td>
                    <td className="border border-gray-200 p-2">{booking.noOfPeople}</td>
                    <td className="border border-gray-200 p-2">NRs. {booking.totalAmount}</td>
                    <td className="border border-gray-200 p-2">{booking.created_at}</td>
                    <td className={classNames('border border-gray-200 p-2', Number(booking.esewa_status) === 1 ? 'text-green-500' : 'text-red-500')}>
                      {Number(booking.esewa_status) === 1 ? 'True' : booking.esewa_status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentBookings;
