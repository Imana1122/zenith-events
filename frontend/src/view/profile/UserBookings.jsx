import React, {  useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { EventListItem } from '../../components/Events/EventListItem';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';

import classNames from 'classnames';

export const UserBookings = () => {
  const [userBookings, setUserBookings] = useState({});

  useEffect(() => {
    axiosClient
      .get('/userBooking')
      .then((response) => {
        console.log(response)
        setUserBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDeleteClick = ({ bookingId }) => {
    axiosClient
      .delete(`/deleteSpecificUserBooking/${bookingId}`)
      .then((response) => {
        toast(response.data.success);
        const successMessage = response.data.success;
        if (successMessage) {
          axiosClient
            .get('/userBooking')
            .then((response) => {
              setUserBookings(response.data);
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
  console.log(userBookings)


  return (


      <div className="block mx-5 px-2 py-16 sm:px-0 align-center">
      <Tab.Group>
        <Tab.List className="flex justify-between rounded-xl bg-blue-900/20 p-1">
          {Object.keys(userBookings).map((booking) => (
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
        <Tab.Panels className="mt-2">
          {Object.values(userBookings).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul className='hidden md:block shadow-lg cursor-pointer transition-transform transform-gpu hover:scale-105'>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.event.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>Time:: {post.event.start_date} to {post.event.end_date}</li>
                      <li>&middot;</li>
                      <li><span>Total number of people:: </span>{post.noOfPeople}</li>
                      <li>&middot;</li>
                      <li><span>Total Amount:: </span>{post.totalAmount}</li>
                    </ul>
                    {idx === 3 && (
                        <button
                        onClick={() => onDeleteClick({bookingId:post.id})}
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2 text-red-600'
                        )}
                  >Remove</button>
                    )}

                  </li>
                ))}
              </ul>
              <ul className='md:hidden shadow-lg cursor-pointer transition-transform transform-gpu hover:scale-105 block'>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-bold leading-5">
                      {post.event.title}
                    </h3>

                    <ul className="mt-1 flex flex-col space-y-1 text-xs font-normal leading-4 text-gray-500">
                      <li>Time:: {post.event.start_date} to {post.event.end_date}</li>
                      <li>&middot;</li>
                      <li><span>Total number of people:: </span>{post.noOfPeople}</li>
                      <li>&middot;</li>
                      <li><span>Total Amount:: </span>{post.totalAmount}</li>
                    </ul>
                   <div>
                   {idx === 3 && (
                        <button
                        onClick={() => onDeleteClick({bookingId:post.id})}
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2 text-red-600'
                        )}
                  >Remove</button>
                    )}
                   </div>

                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>

  );
};
