import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../core/TButton";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import { PageComponent } from "../AdminLayoutComponent";

export const NewEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(eventId ? "update" : "create");
  const [trainers, setTrainers] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    workshop: "",
    start_date: null,
    end_date: null,
    imagePath: null,
    price: "",
    description: "",
    address: "",
    eventHostDetails: ""
  });

  const [selectedTrainers, setSelectedTrainers] = useState([]);

  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    setSelectedTrainers((prevSelectedTrainers) =>
      isChecked
        ? [...prevSelectedTrainers, checkboxName]
        : prevSelectedTrainers.filter((name) => name !== checkboxName)
    );
  };

  useEffect(() => {
    if (eventId && mode === "update") {
      // Fetch the existing event data using the eventId
      axiosClient
        .get(`/events/${eventId}`)
        .then((response) => {
          setEvent(response.data.event);

          // Create an array of trainer IDs associated with the event
          const selectedTrainerIds = response.data.event.trainers.map(
            (trainer) => trainer.id.toString()
          );

          // Set selectedTrainers state based on fetched event data
          setSelectedTrainers(selectedTrainerIds);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [eventId, mode]);

  useEffect(() => {
    axiosClient
      .get("/allTrainers")
      .then((response) => {
        setTrainers(response.data.trainers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosClient.post("/uploadImage", formData);
      const imagePath = response.data.imageUrl; // Assuming the response contains 'imageUrl'
      setEvent((prev) => ({
        ...prev,
        imagePath: imagePath,
      }));
    } catch (error) {

    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const requestUrl = eventId ? `/updateEvent/${eventId}` : "/createEvent";
    const requestMethod = eventId ? "PUT" : "POST";

    axiosClient
      .request({
        url: requestUrl,
        method: requestMethod,
        data: {
          title: event.title,
          workshop: event.workshop,
          start_date: event.start_date,
          end_date: event.end_date,
          imagePath: event.imagePath,
          price: event.price,
          description: event.description,
          address: event.address,
          selectedTrainers: selectedTrainers,
          eventHostDetails: event.eventHostDetails
        },
      })
      .then(({ data }) => {

        toast.success(data.message);
        navigate("/events");
 
        // Handle the response data
      })
      .catch((error) => {
        // Handle the error
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          toast.error(errorMessages.join("\n"));
        } else {
          console.log(error);
        }
      });
  };

  const handleInputChange = (field, value) => {
    if (field === "image") {
      if (value instanceof File) {
        setEvent((prev) => ({
          ...prev,
          image: value,
        }));
      } else {
        setEvent((prev) => ({
          ...prev,
          image: null,
        }));
      }
    } else {
      setEvent((prev) => ({
        ...prev,
        [field]: value === null || value === undefined ? "" : value,
      }));
    }
  };

  return (
    <PageComponent title={mode === "update" ? "Edit Event" : "Add New Event"}>
      <div className="md:mx-10 m-auto">
        <form
          action={mode === "update" ? `/updateEvent/${eventId}` : "/createEvent"}
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="shadow sm:overflow-hidden sm:rounded-md md:p-10 rounded-lg ">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {event.imagePath && (
                    <img
                      src={event.imagePath}
                      alt="event"
                      className="w-1/2 object-cover rounded-lg"
                    />
                  )}
                  {!event.imagePath && (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-full h-full" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute text-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={uploadImage}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Image */}

              {/* Workshop */}
              <div className="relative w-full">
                <label
                  htmlFor="workshop"
                  className="absolute top-0 left-2 -translate-y-2 bg-white px-1 text-gray-700 text-xs"
                >
                  Workshop Category
                </label>
                <select
                  id="workshop"
                  name="workshop"
                  required
                  value={event.workshop}
                  onChange={(e) => handleInputChange("workshop", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a category</option>
                  <option value="Softskills Workshop">Softskills Workshop</option>
                  <option value="Laravel Workshop">Laravel Workshop</option>
                  <option value="React Workshop">React Workshop</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              {/* Workshop */}

              {/* Title */}
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder=" "
                  required
                  value={event.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="title"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    event.title
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${event.title ? "bg-white px-1" : ""}`}
                >
                  Event Title
                </label>
              </div>
              {/* Title */}

              {/* Address */}
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder=" "
                  required
                  value={event.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="address"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    event.address
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${event.address ? "bg-white px-1" : ""}`}
                >
                  Address
                </label>
              </div>
              {/* Address */}

              {/* Price */}
              <div className="relative">
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder=" "
                  required
                  value={event.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="price"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    event.price
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${event.price ? "bg-white px-1" : ""}`}
                >
                  Price
                </label>
              </div>
              {/* Price */}

              {/* Description */}
              <div className="relative">
                <textarea
                  name="description"
                  id="description"
                  value={event.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe your event"
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
                <label
                  htmlFor="description"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    event.description
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${event.description ? "bg-white px-1" : ""}`}
                >
                  Description
                </label>
              </div>
              {/* Description */}

               {/* eventHostDetails */}
               <div className="relative">
                <textarea
                  name="eventHostDetails"
                  id="eventHostDetails"
                  value={event.eventHostDetails}
                  onChange={(e) =>
                    handleInputChange("eventHostDetails", e.target.value)
                  }
                  placeholder="Describe your event host"
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
                <label
                  htmlFor="eventHostDetails"
                  className={`absolute left-2 transition-all duration-300 pointer-events-none text-black ${
                    event.eventHostDetails
                      ? "-top-3 text-sm"
                      : "top-1/2 -translate-y-1/2 text-sm"
                  } ${event.eventHostDetails ? "bg-white px-1" : ""}`}
                >
                  Event Host Details
                </label>
              </div>
              {/* eventHostDetails */}

              {/* Start Date */}
              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="start_date"
                  className="absolute left-2 -top-3 text-sm bg-white px-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={event.start_date || ""}
                  onChange={(ev) =>
                    setEvent({ ...event, start_date: ev.target.value })
                  }
                  placeholder=""
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* Start Date */}

              {/* End Date */}
              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="end_date"
                  className="absolute left-2 -top-3 text-sm bg-white px-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={event.end_date || ""}
                  onChange={(ev) =>
                    setEvent({ ...event, end_date: ev.target.value })
                  }
                  placeholder=""
                  className="block w-full rounded-md border-2 border-gray-400 py-3 px-2 text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {/* End Date */}

              {/* Trainers */}
              <p className="font-semibold">Select Trainers</p>
              <div className="flex justify-between items-start ">

                {trainers.map((trainer) => (
                  <label key={trainer.id} className="flex space-x-5">
                    <input
                      type="checkbox"
                      name={trainer.id.toString()}
                      checked={selectedTrainers.includes(trainer.id.toString())}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    {trainer.name}
                  </label>
                ))}
              </div>
              {/* Trainers */}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              {mode === "update" ? (
                <>
                  <TButton type="submit">Update</TButton>
                </>
              ) : (
                <TButton type="submit">Save</TButton>
              )}
            </div>
          </div>
        </form>
      </div>
    </PageComponent>
  );
};

export default NewEvent;
