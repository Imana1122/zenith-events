import React from 'react';

const TrainerCard = ({ trainer }) => {
  return (
    // Flex container with centered items and some spacing
    <div className="flex justify-center items-center space-x-3">
      {/* Trainer image */}
      <div className="w-1/2 m-auto">
        <img src={trainer.imagePath} alt={trainer.name} className="w-[200px] h-[180px] rounded-lg" />
      </div>

      {/* Trainer details */}
      <div className="flex flex-col text-left md:ml-5 justify-between w-1/2">
        {/* Trainer name */}
        <h2 className="text-xl font-semibold text-purple-900">{trainer.name}</h2>

        {/* Trainer post */}
        <p className="text-xl">{trainer.post}</p>

        {/* Trainer skill level */}
        <p>{trainer.skillLevel}</p>

        {/* Trainer experience */}
        <p>{trainer.experienceYears} years of experience</p>
      </div>
    </div>
  );
};

export default TrainerCard;
