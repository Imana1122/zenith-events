import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { toast } from 'react-hot-toast';
import { Tab } from '@headlessui/react';
import { AiFillDelete } from "react-icons/ai";
import classNames from 'classnames';
import TButton from '../../components/core/TButton';
import {CiWarning} from "react-icons/ci";
import Modal from '../../components/core/Modal';

export const UserBookings = () => {
  const [userBookings, setUserBookings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch user bookings from the server
  const fetchBookings = () => {
    axiosClient
      .get('/userBooking')
      .then((response) => {
        setUserBookings(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Handle delete action for a specific booking
  const handleDelete = ({ bookingId }) => {
    axiosClient
      .delete(`/deleteSpecificUserBooking/${bookingId}`)
      .then((response) => {
        toast(response.data.success);
        const successMessage = response.data.success;
        if (successMessage) {
          fetchBookings();
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // Open the delete confirmation modal with the provided bookingId
  const onDeleteClick = (eventId) => {
    setIsModalOpen(true);
    setBookingIdToDelete(eventId);
  };

  return (
    <div className='md:flex md:justify-center md:items-center'>

      {/* Check if userBookings is not empty */}
      {Object.keys(userBookings).length > 0 ? (
        <div className="block md:mx-5 px-2 py-16 sm:px-0 lg:w-2/3">
          <Tab.Group>
            {/* Tab List */}
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

            {/* Tab Panels */}
            <Tab.Panels className="mt-2">
              {Object.values(userBookings).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {/* Large Screen View */}
                  <ul className='hidden md:block space-y-5'>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 flex justify-between items-center shadow-lg cursor-pointer transition-transform transform-gpu hover:scale-105"
                      >
                        <div className='flex justify-start space-x-2 items-center'>
                          <div className='h-[100px] w-[100px]'>
                            <img src={post.event.imagePath} alt={post.event.workshop} className='w-full h-full rounded-md' />
                          </div>
                          <div>
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
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div>
                          {/* Show delete button for a specific index */}
                          {idx === 3 && (
                            <TButton circle onClick={() => onDeleteClick({ bookingId: post.id })} color="red">
                              <AiFillDelete />
                            </TButton>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Small Screen View */}
                  <ul className='md:hidden block'>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 shadow-lg cursor-pointer transition-transform transform-gpu hover:scale-105"
                      >
                        <div className='flex justify-start space-x-2 items-center'>
                          <div className='h-[100px] w-[150px]'>
                            <img src={post.event.imagePath} alt={post.event.workshop} className='w-full h-full rounded-md' />
                          </div>
                          <div className='w-full'>
                            <h3 className="text-sm font-bold leading-5">
                              {post.event.title}
                            </h3>

                            <ul className="mt-1 mb-2 flex flex-col text-xs font-normal leading-3 text-gray-500">
                              <li>Time:: {post.event.start_date} to {post.event.end_date}</li>
                              <li>&middot;</li>
                              <li><span>Total number of people:: </span>{post.noOfPeople}</li>
                              <li>&middot;</li>
                              <li className='flex justify-between w-full'>
                                <div className='flex items-center'> {/* Flex container */}
                                  <span>Total Amount: {post.totalAmount}</span>
                                </div>
                                <div className='flex items-center'> {/* Flex container for delete button */}
                                  {/* Show delete button for a specific index */}
                                  {idx === 3 && (
                                    <TButton circle onClick={() => onDeleteClick({ bookingId: post.id })} color='red'>
                                      <AiFillDelete />
                                    </TButton>
                                  )}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      ) : (
        // Show loading message if userBookings is empty
        <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
      )}

      {/* Modal for delete confirmation */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          {/* Add a focusable element (e.g., a button) for initial focus */}
          <button className="hidden" autoFocus />
          <p className="flex items-center"><span className="text-red-500 font-bold text-4xl mr-5"><CiWarning/></span>Are you sure you want to delete this booking?</p>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => handleDelete(bookingIdToDelete)}
            >
              Yes, Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
