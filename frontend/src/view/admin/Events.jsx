import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/core/TButton";
import axiosClient from "../../axios";
import { Tab } from '@headlessui/react';
import classNames from "classnames";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/core/Modal";
import { CiWarning } from "react-icons/ci";

export const Events = () => {
  const { searchQuery } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  const [events, setEvents] = useState({});
  useEffect(() => {
    search();
  }, [searchQuery]);

  const search = () => {
    if (searchQuery) {
      axiosClient.get('/search/events', { params: { query: searchQuery } })
        .then((response) => {
        //   console.log(response);
          // Update the 'events' state with the search results
          setEvents(response.data);
        })
        .catch((error) => {
        //   console.log(error);
        });
    } else {
      axiosClient
        .get("/allEvents")
        .then((response) => {
        //   console.log(response);
          setEvents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const today = new Date();

  const handleDelete = (eventId) => {
    axiosClient
      .delete(`/deleteEvent/${eventId}`)
      .then(() => {
        search();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteClick = (eventId) => {
    setIsModalOpen(true);
    setEventIdToDelete(eventId);
  };

  return (
    <PageComponent
      title="Events"
      buttons={
        <TButton color="green" to="/events/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >
      {/* Render events in tab format */}
      <div className='md:flex md:justify-center md:items-center'>
        {Object.keys(events).length > 0 ? (
          <div className="block px-1 py-16 sm:px-0 w-full">
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex justify-between rounded-xl bg-blue-900/20 p-1">
                {Object.keys(events).map((event) => (
                  <Tab
                    key={event}
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
                    {event}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2">
                {Object.values(events).map((events, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {/* Table to display events */}
                    <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
                      <thead className="bg-gray-400">
                        <tr>
                          <th className="border border-gray-200 p-2">ID</th>
                          <th className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                            Image
                          </th>
                          <th className="border border-gray-200 p-2">Title</th>
                          <th className="border border-gray-200 p-2">Workshop</th>
                          <th className="border border-gray-200 p-2">Start Date</th>
                          <th className="border border-gray-200 p-2">End Date</th>
                          <th className="border border-gray-200 p-2">Price</th>
                          <th className="border border-gray-200 p-2">Address</th>
                          <th className="border border-gray-200 p-2">EventTrainers</th>
                          <th className="border border-gray-200 p-2">Status</th>
                          <th className="border border-gray-200 p-2">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events && events.length > 0 ? (
                          events.map((event) => (
                            <tr className="border border-gray-200" key={event.id}>
                              <td className="border border-gray-200 p-2"><div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(event.id.toString(), searchQuery) }} /></td>
                              <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                                <img
                                  src={event.imagePath}
                                  alt={event.workshop}
                                  className="w-full h-full rounded-sm"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                {/* Use the highlightSearchQuery function to display the event's title */}
                                <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(event.title, searchQuery) }} />
                              </td>
                              <td className="border border-gray-200 p-2"><div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(event.workshop, searchQuery) }} /></td>
                              <td className="border border-gray-200 p-2">{event.start_date}</td>
                              <td className="border border-gray-200 p-2">{event.end_date}</td>
                              <td className="border border-gray-200 p-2">NRs.{event.price}</td>
                              <td className="border border-gray-200 p-2">{event.address}</td>
                              <td>
                                <ul>
                                  {event.trainers.map((trainer) => (
                                    <li key={trainer.id} className="text-green-500">{trainer.name}</li>
                                  ))}
                                </ul>
                              </td>
                              <td
                                className={`border border-gray-200 p-2 ${
                                  new Date(event.start_date) > today
                                    ? "text-green-500"
                                    : new Date(event.end_date) < today
                                    ? "text-red-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {new Date(event.start_date) > today
                                  ? "Upcoming"
                                  : new Date(event.end_date) < today
                                  ? "Finished"
                                  : "Ongoing"}
                              </td>
                              <td className="border border-gray-200 p-2">
                                <div className="flex justify-between items-center mt-3">
                                  <Link to={`/events/update/${event.id}`}>
                                    <TButton circle  color="green">
                                      <PencilIcon className="w-5 h-5 mr-2" />
                                    </TButton>
                                  </Link>
                                  <div className="flex items-center">
                                    {event.id && (
                                      <TButton
                                        onClick={() => { onDeleteClick(event.id) }}
                                        circle
                                        color="red"
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </TButton>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="border border-gray-200 p-2" colSpan={10}>
                              No events available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            {/* Modal for delete confirmation */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-4">
                {/* Add a focusable element (e.g., a button) for initial focus */}
                <button className="hidden" autoFocus />
                <p className="flex items-center">
                  <span className="text-red-500 font-bold text-4xl mr-5">
                    <CiWarning />
                  </span>
                  Are you sure you want to delete this event?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(eventIdToDelete)}
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
        ) : (
          <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
        )}
      </div>
    </PageComponent>
  );
};
