import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import { useStateContext } from '../../contents/ContextProvider';
import { highlightSearchQuery } from '../../utility/HighlightText';

const RecentBookings = () => {
    const {searchQuery} = useStateContext();

    const [bookings, setBookings] = useState({});
  useEffect(() => {
    if (searchQuery) {
      axiosClient.get('/search/bookings',{ params: { query: searchQuery } })
        .then((response) => {
        //   console.log(response);
          // Update the 'data' state with the search results
          setBookings(response.data);
        })
        .catch((error) => {
        //   console.log(error);
        });
    }else{
        axiosClient
      .get('/bookings') // Replace with the correct API endpoint
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [searchQuery]);




  return (
    <div className='flex flex-col justify-between items-start bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
      <h2 className='font-semibold text-xl mb-5'>Recent Bookings</h2>
      {/* Render bookings in tab format */}
      <div>
        {Object.keys(bookings).length > 0 ? (
          <div className="block px-1 pb-16 sm:px-0 w-full">
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex justify-between rounded-xl bg-blue-900/20 p-1">
                {Object.keys(bookings).map((booking) => (
                  <Tab
                    key={booking}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {booking}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2">
                {Object.values(bookings).map((bookings, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {/* Table to display bookings */}
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
                        {bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="border border-gray-200 p-2">
                                <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(booking.id.toString(), searchQuery) }} />
                                </td>
                                <td className="border border-gray-200 p-2">
                                <Link to={`#`} className="cursor-pointer text-sky-500">
                                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(booking.userId.toString(), searchQuery) }} />
                                </Link>
                                </td>
                                <td className="border border-gray-200 p-2">
                                <Link to={`#`} className="cursor-pointer text-sky-500">
                                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(booking.eventId.toString(), searchQuery) }} />
                                </Link>
                                </td>
                                <td className="border border-gray-200 p-2">{booking.noOfPeople}</td>
                                <td className="border border-gray-200 p-2">NRs. {booking.totalAmount}</td>
                                <td className="border border-gray-200 p-2">{booking.created_at}</td>
                                <td
                                className={classNames(
                                    'border border-gray-200 p-2',
                                    Number(booking.esewa_status) === 1 ? 'text-green-500' : 'text-red-500'
                                )}
                                >
                                {Number(booking.esewa_status) === 1 ? 'True' : booking.esewa_status}
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border border-gray-200 p-2" colSpan={7}>
                                No bookings available
                            </td>
                            </tr>
                        )}
                      </tbody>

                    </table>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : (
          <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;
