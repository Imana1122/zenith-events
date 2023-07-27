import React from 'react';

const EventFeature = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-5 mb-10">
      <div className="md:w-1/3">
        <img src="https://th.bing.com/th/id/OIP.SzruJdQXDlSQc9BETSX_8wHaEK?w=257&h=180&c=7&r=0&o=5&pid=1.7" alt="Event" className="w-full rounded-lg" />
      </div>
      <div className="md:w-1/3 text-left">
        <h2 className="text-3xl text-purple-800 font-semibold mb-4">Mega DS Talk Show</h2>
        <p className="text-gray-600">7th April, 2024</p>
        <p className="text-gray-600">Chitlang, Makwanpur</p>
        <button className='bg-purple-800 text-white text-xl px-4 py-1 my-3 rounded-lg'>Buy Now</button>
        {/* Additional details or components can be added here */}
      </div>
    </div>
  );
};

export default EventFeature;
