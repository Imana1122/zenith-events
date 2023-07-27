import React from 'react'
import RecentBookings from './RecentBookings'
import PopularEvents from './PopularEvents'

const Bookings = () => {
  return (
    <div><div className='flex flex-row gap-4 w-full'>
    <RecentBookings/>
    <PopularEvents />
 </div></div>
  )
}

export default Bookings
