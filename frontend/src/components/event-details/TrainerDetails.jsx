import React from 'react';

const TrainerDetails = ({ trainers, event }) => {
  return (
    // Flex container with column wrap and left alignment for items
    <div className="flex flex-wrap flex-col items-start px-10">
      {/* Trainer cards */}
      <div className='flex flex-wrap flex-row items-start mb-10'>
        {/* Check if there are trainers available */}
        {trainers.length > 0 ? (
          // If trainers are available, map through the trainers array
          trainers.map(trainer => (
            // Trainer card with image and name
            <div key={trainer.id} className="m-4">
              <img src={trainer.imagePath} alt={trainer.name} className="w-48 h-32 object-cover rounded-lg" />
              <p className="text-start text-lg font-semibold mt-2">{trainer.name}</p>
            </div>
          ))
        ) : (
          // If no trainers are available, display a message
          <p className="text-center">No trainers available</p>
        )}
      </div>

      {/* Training Host Profile */}
      <h2 className="items-start text-5xl text-black text-left mb-5">Training Host Profile</h2>
      <p className="text-left">{event.eventHostDetails}</p>
    </div>
  );
};

export default TrainerDetails;
