import React from 'react';
import ZenithEventsLogo from '../../assets/zenitheventslogo.svg';

const GuestLayoutComponent = ({ title, children }) => {
  return (
    // Flex container with minimum screen height, vertical centering, and background color
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 space-y-5">
      {/* Logo */}
      <div>
        <img
          className="mx-auto h-20 w-auto"
          src={ZenithEventsLogo}
          alt="ZenithEvents"
        />
      </div>

      {/* Title (if provided) */}
      {title}

      {/* Container for the content */}
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {/* Render the child components passed as children */}
        {children}
      </div>
    </div>
  );
};

export default GuestLayoutComponent;
