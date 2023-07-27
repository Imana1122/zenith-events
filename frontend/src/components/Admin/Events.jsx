import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageComponent } from "../AdminLayoutComponent";
import TButton from "../core/TButton";
import axiosClient from "../../axios";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const today = new Date();
  useEffect(() => {
    axiosClient
      .get("/allEvents")
      .then((response) => {
        setEvents(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  useEffect(() => {
    // Apply the status filter
    if (statusFilter === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);

        if (statusFilter === "yet") {
          return startDate > today;
        } else if (statusFilter === "ongoing") {
          return startDate <= today && endDate >= today;
        } else if (statusFilter === "finished") {
          return endDate < today;
        }
        return true;
      });
      setFilteredEvents(filtered);
    }
  }, [events, statusFilter]);

  const handleDelete = (eventId) => {
    axiosClient
      .delete(`/deleteEvent/${eventId}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteClick = (eventId) => {
    handleDelete(eventId);
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
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
      <div className="flex justify-between items-center">
        <div>
          <TButton
            color="indigo"
            onClick={() => handleFilterClick("")}
            active={statusFilter === ""}
          >
            All
          </TButton>
        </div>
        <div>
          <TButton
            color="red"
            onClick={() => handleFilterClick("finished")}
            active={statusFilter === "finished"}
          >
            Finished
          </TButton>
        </div>
        <div>
          <TButton
            color="green"
            onClick={() => handleFilterClick("ongoing")}
            active={statusFilter === "ongoing"}
          >
            Ongoing
          </TButton>
        </div>
        <div>
          <TButton
            color="yellow"
            onClick={() => handleFilterClick("yet")}
            active={statusFilter === "yet"}
          >
            Yet
          </TButton>
        </div>
      </div>
      <div className="mt-3 text-sm">
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
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event.id} className="border border-gray-200">
                  <td className="border border-gray-200 p-2">{event.id}</td>
                  <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                    <img
                      src={event.imagePath}
                      alt={event.workshop}
                      className="w-full h-full rounded-sm"
                    />
                  </td>
                  <td className="border border-gray-200 p-2">{event.title}</td>
                  <td className="border border-gray-200 p-2">{event.workshop}</td>
                  <td className="border border-gray-200 p-2">{event.start_date}</td>
                  <td className="border border-gray-200 p-2">{event.end_date}</td>
                  <td className="border border-gray-200 p-2">NRs.{event.price}</td>
                  <td className="border border-gray-200 p-2">{event.address}</td>
                  <td>
                <ul>
                  {event.trainers.map((trainer) => (
                    <li key={trainer.id} className="text-green-500">{trainer.name}</li>
                  ))}
                </ul></td>
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
                      ? "Yet"
                      : new Date(event.end_date) < today
                      ? "Finished"
                      : "Ongoing"}
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex justify-between items-center mt-3">
                      <Link to={`/events/update/${event.id}`}>
                        <TButton circle link color="green">
                          <PencilIcon className="w-5 h-5 mr-2" />
                        </TButton>
                      </Link>
                      <div className="flex items-center">
                        {event.id && (
                          <TButton
                            onClick={() => onDeleteClick(event.id)}
                            circle
                            link
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
      </div>
    </PageComponent>
  );
};
