import React from 'react'

const TrainerCard = ({trainer}) => {
  return (

    <div className="flex justify-center items-center space-x-3">
        <div className="w-1/2 m-auto">
          <img src={trainer.imagePath} alt={trainer.name} className='md:w-1/2 w-full rounded-lg'/>
        </div>
        <div className="flex flex-col text-left md:ml-5 justify-between w-1/2">
          <h2 className="text-xl font-semibold text-purple-900">{trainer.name}</h2>
          <p className="text-xl">{trainer.post}</p>
          <p>{trainer.skillLevel}</p>
          <p>{trainer.experienceYears} years of experience</p>
        </div>


    </div>
  )
}

export default TrainerCard
