// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainerDetails from '../components/EventDetails/TrainerDetails';
import { decreaseCount, increaseCount } from '../redux/countSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { selectEvent } from '../redux/eventSlice';
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi"

const EventDetails = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();



    const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;
    console.log(selectedEvent)

    const count = useSelector((state) => state.count.count);


    console.log(count, selectedEvent);


    useEffect(()=>{
        if(!selectedEvent){
            navigate('/')
          }
    })


      const handleIncrease = (eventId) => {
        const serializableEventId = eventId.toString(); // Convert eventId to a string
        dispatch(increaseCount(serializableEventId));
      };

      const handleDecrease = (eventId) => {
        const serializableEventId = eventId.toString();
        dispatch(decreaseCount(serializableEventId));
      };





  return (
    <>
      <div className="bg-white rounded md:px-2 md:m-10 px-4">
        <div className="flex flex-col md:flex-row md:justify-center md:items-start mb-4 overflow-hidden md:space-x-10">
          <div className='w-full h-full md:full '>
          <img src={selectedEvent.imagePath} alt={selectedEvent.title} className="h-full w-full rounded object-cover" />
          </div>
          <div className="md:w-[900px] flex flex-col items-start space-y-1 md:m-auto text-2xl">
            <h2 className="text-2xl md:text-5xl mb-4 text-left text-purple-900">{selectedEvent.title}</h2>
            <div className="border border-purple-900 rounded-lg p-1 w-fit">
              <p className="text-2xl font-semibold text-red-500">${selectedEvent.price}</p>
            </div>
                <p className="text-left text-2xl">{selectedEvent.address}</p>
                <p className="text-left text-2xl">{selectedEvent.start_date} to {selectedEvent.end_date}</p>
                <p className="text-left text-2xl ">{selectedEvent.workshop}</p>

                <div className="flex items-center space-x-3 mt-3">
                <button

                onClick={handleDecrease}
                >
                <BiMinusCircle className='text-4xl'/>
                </button>
                <p className="text-lg font-semibold mr-2">{count}</p>
                <button

                onClick={handleIncrease}
                >
                <BiPlusCircle  className='text-4xl'/>
                </button>

                <Link
                    to={{
                        pathname: `/event/${selectedEvent.title}/cart-form`,
                        state: {
                        selectedEvent: selectedEvent,
                        count: count
                        }
                    }}
                    className="bg-purple-900 text-white rounded-lg text-xl w-fit py-2 px-4"
                    >
                    Book Now
                    </Link>


            </div>

        </div>


    </div>




    <div className="flex items-start flex-col mt-10 md:px-2 md:m-5 px-4">
        <hr className="border border-purple-300 w-full my-2" />
        <h2 className="text-2xl md:text-5xl text-purple-900 md:text-black md:text-left text-center md:mb-5">Training Details</h2>
        <hr className="border border-purple-300 w-full my-2 md:hidden" />
        <p className="text-justify md:text-left">{selectedEvent.description}</p>
    </div>

    <div className="flex flex-col mt-10 md:px-2 md:m-5 px-4">
      <hr className="border border-purple-300 w-full my-2 " />
      <h2 className="text-2xl items-start md:text-5xl text-purple-900 md:text-black md:text-left text-center md:mb-5">Trainer Profile</h2>
      <hr className="border-purple-300 w-full my-2 " />

      <div className='flex flex-col space-y-5 md:grid md:grid-cols-2 md:gap-4 justify-center xl:px-30 items-center'>
      {selectedEvent.trainers ? selectedEvent.trainers.map((trainer)=>(
        <div key={trainer.id} className="flex justify-center items-center space-x-3">
        <div className="w-1/2 m-auto">
          <img src={trainer.imagePath} alt={trainer.name} className='w-[200px] h-[180px] rounded-lg'/>
        </div>
        <div className="flex flex-col text-left md:ml-5 justify-between w-1/2">
          <h2 className="text-xl font-semibold text-purple-900">{trainer.name}</h2>
          <p className="text-xl">{trainer.post}</p>
          <p>{trainer.skillLevel}</p>
          <p>{trainer.experienceYears} years of experience</p>
        </div>

      </div>
      )): (
        <p>No trainers</p>
      )}
      </div>
      <h2 className="items-start text-5xl text-black text-left mb-5 mt-10">Training Host Profile</h2>
          <p className="text-left">{selectedEvent.eventHostDetails}</p>
      {/* <div className='hidden md:block'>
        <TrainerDetails trainers={selectedEvent.trainers} event={selectedEvent}/>
      </div> */}


    </div>
</div>
  </>
  );
};

export default EventDetails;


