import React from 'react'

const TrainerDetails = ({trainers, event}) => {

    return (
        <div className="flex flex-wrap flex-col items-start px-10">
          <div className='flex flex-wrap flex-row items-start mb-10'>
            {trainers.length > 0 ? (
                trainers.map(trainer => (
                <div key={trainer.id} className="m-4">
                    <img src={trainer.imagePath} alt={trainer.name} className="w-48 h-32 object-cover rounded-lg" />
                    <p className="text-start text-lg font-semibold mt-2">{trainer.name}</p>
                </div>
                ))
            ) : (
                <p className="text-center">No trainers available</p>
            )}
          </div>
          <h2 className="items-start text-5xl text-black text-left mb-5">Training Host Profile</h2>
          <p className="text-left">{event.eventHostDetails}</p>
        </div>
    );
};


export default TrainerDetails
