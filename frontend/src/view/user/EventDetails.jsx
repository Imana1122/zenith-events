// Import necessary libraries and components
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount } from '../../redux/countSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import TrainerCard from '../../components/event-details/TrainerCard';

const EventDetails = () => {
  // Get the navigate function from react-router-dom for programmatic navigation
  const navigate = useNavigate();
  // Get the dispatch function from react-redux for dispatching actions
  const dispatch = useDispatch();

  // Get the selectedEvent from the Redux store or set it to null if not available
  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  // Get the count from the Redux store
  const count = useSelector((state) => state.count.count);

  // Check if the selectedEvent is available, otherwise navigate back to the home page
  useEffect(() => {
    if (!selectedEvent) {
      navigate('/');
    }
  });

  // Event handler for increasing the count
  const handleIncrease = () => {
    // Dispatch the increaseCount action with the eventId
    dispatch(increaseCount(selectedEvent?.id));
  };

  // Event handler for decreasing the count
  const handleDecrease = () => {
    // Dispatch the decreaseCount action with the eventId
    dispatch(decreaseCount(selectedEvent?.id));
  };

  return (
    <>
      {/* Event details section */}
      <div className="bg-white rounded md:px-2 md:m-10 px-4">
        {/* Event image */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-start mb-4 overflow-hidden md:space-x-10">
          <div className="w-full h-full md:full">
            <img src={selectedEvent?.imagePath} alt={selectedEvent?.title} className="h-full w-full rounded object-cover" />
          </div>
          {/* Event information */}
          <div className="md:w-[900px] flex flex-col items-start space-y-1 md:m-auto text-2xl">
            <h2 className="text-2xl md:text-5xl mb-4 text-left text-purple-900">{selectedEvent?.title}</h2>
            <div className="border border-purple-900 rounded-lg p-1 w-fit">
              <p className="text-2xl font-semibold text-red-500">${selectedEvent?.price}</p>
            </div>
            <p className="text-left text-2xl">{selectedEvent?.address}</p>
            <p className="text-left text-2xl">{selectedEvent?.start_date} to {selectedEvent?.end_date}</p>
            <p className="text-left text-2xl ">{selectedEvent?.workshop}</p>
            {/* Count control */}
            <div className="flex items-center space-x-3 mt-3">
              <button onClick={handleDecrease}>
                <BiMinusCircle className="text-4xl" />
              </button>
              <p className="text-lg font-semibold mr-2">{count}</p>
              <button onClick={handleIncrease}>
                <BiPlusCircle className="text-4xl" />
              </button>
              {/* Link to the booking form */}
              <Link
                to={{
                  pathname: `/event/${selectedEvent?.title}/cart-form`,
                  state: {
                    selectedEvent: selectedEvent,
                    count: count,
                  },
                }}
                className="bg-purple-900 text-white rounded-lg text-xl w-fit py-2 px-4"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
        {/* Training details */}
        <div className="flex items-start flex-col mt-10 md:px-2 md:m-5 px-4">
          <hr className="border border-purple-300 w-full my-2" />
          <h2 className="text-2xl md:text-5xl text-purple-900 md:text-black md:text-left text-center md:mb-5">Training Details</h2>
          <hr className="border border-purple-300 w-full my-2 md:hidden" />
          <p className="text-justify md:text-left">{selectedEvent?.description}</p>
        </div>
        {/* Trainer profile */}
        <div className="flex flex-col mt-10 md:px-2 md:m-5 px-4">
          <hr className="border border-purple-300 w-full my-2 " />
          <h2 className="text-2xl items-start md:text-5xl text-purple-900 md:text-black md:text-left text-center md:mb-5">Trainer Profile</h2>
          <hr className="border-purple-300 w-full my-2 " />
          {/* Display trainers and their details */}
          <div className="flex flex-col space-y-5 md:grid md:grid-cols-2 md:gap-4 justify-center xl:px-30 items-center">
            {selectedEvent?.trainers ? (
              selectedEvent.trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))
            ) : (
              <p>No trainers</p>
            )}
          </div>
          <h2 className="items-start text-5xl text-black text-left mb-5 mt-10">Training Host Profile</h2>
          <p className="text-left">{selectedEvent?.eventHostDetails}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
