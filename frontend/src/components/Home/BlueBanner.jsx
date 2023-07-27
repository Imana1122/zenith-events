import React from 'react';

const BlueBanner = () => {
  return (
    <div className="bg-blue-500 py-10">
      <div className="container px-4 flex items-center justify-center space-x-20 ">
        <p className="text-white text-2xl font-bold text-left">Are you a <br/> Professional Trainer?</p>
        <button className="bg-purple-900 text-white py-2 px-4 rounded-lg shadow-md text-2xl  font-bold hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out border-white border-2">Join Us !</button>
      </div>
    </div>
  );
};

export default BlueBanner;
