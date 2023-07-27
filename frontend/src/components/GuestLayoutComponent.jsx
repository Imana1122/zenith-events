import React from 'react'
import ZenithEventsLogo from '../assets/zenitheventslogo.svg';

const GuestLayoutComponent = ({title, children}) => {
  return (

    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 space-y-5">
            <div>
            <img
            className="mx-auto h-20 w-auto"
            src={ZenithEventsLogo}
            alt="ZenithEvents"
          />
            </div>
            {title}

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
  )
}

export default GuestLayoutComponent
