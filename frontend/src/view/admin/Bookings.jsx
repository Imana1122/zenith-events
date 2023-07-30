import React from 'react';
import RecentBookings from '../../components/admin/RecentBookings';
import PopularEvents from '../../components/admin/PopularEvents';

const Bookings = () => {
  return (
    <div>
      {/* Recent Bookings and Popular Events */}
      <div className='flex flex-row gap-4 w-full'>
        <RecentBookings />
        <PopularEvents />
      </div>
    </div>
  );
};

export default Bookings;
