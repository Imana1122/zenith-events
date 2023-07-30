import React from 'react';

const UserLayoutComponent = ({ title, children }) => {
  return (
    // Flex container with max width, horizontal padding, and vertical spacing
    <div className='flex flex-col justify-start items-start max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12'>
      {/* Title of the user layout */}
      <h2 className='font-bold text-xl text-purple-800 leading-tight font-serif ml-4'>{title}</h2>

      {/* Container for the content */}
      <div>
        {/* Render the child components passed as children */}
        {children}
      </div>
    </div>
  );
};

export default UserLayoutComponent;
