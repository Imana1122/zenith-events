import React from 'react'
import { Link } from 'react-router-dom'

const EsewaFailure = () => {
  return (
    <div className='flex flex-col justify-between items-center my-10'>
        <p className='text-red-700 text-xl font-thin my-5'>Your bookings is not done as your payment is not successful</p>
        <p>Book your events again <Link to={'/'} className='text-green-700 text-xl font-bold'>HERE!</Link> </p>
    </div>
  )
}

export default EsewaFailure
