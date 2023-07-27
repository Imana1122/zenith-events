import React from 'react';
import ZenithEventsLogo from '../assets/zenitheventslogo.svg';

const Footer = () => {
  return (
    <>
    <div className='md:block hidden'>
    <footer className="bg-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-20 items-center">
          {/* Logo column */}
          <div className="flex items-center">
            <img src={ZenithEventsLogo} alt="Logo" className="h-[250px] w-[250px]" />
          </div>

          {/* Policies column */}
          <div className="text-left">
            <h3 className="text-md mb-3 text-gray-800">POLICIES</h3>
            <ul className="list-none">
              <li className="mb-1 text-gray-600">Privacy Policy</li>
              <li className="mb-1 text-gray-600">Terms and Conditions</li>
              <li className="mb-1 text-gray-600">Refund Policy</li>
            </ul>
          </div>

          {/* General column */}
          <div className="text-left">
            <h3 className="text-md mb-3 text-gray-800">GENERAL</h3>
            <ul className="list-none">
              <li className="mb-1 text-gray-600">FAQ</li>
              <li className="mb-1 text-gray-600">Our Team</li>
              <li className="mb-1 text-gray-600">USER GUIDE</li>
            </ul>
          </div>

          {/* Company column */}
          <div className="text-left">
            <h3 className="text-md mb-3 text-gray-800">COMPANY</h3>
            <ul className="list-none">
              <li className="mb-1 text-gray-600">About Us</li>
              <li className="mb-1 text-gray-600">Career</li>
              <li className="mb-1 text-gray-600">Blog</li>
            </ul>
          </div>
        </div>

        {/* Line */}
        <hr className="my-6 border-gray-500" />

        {/* Copyright */}
        <p className="text-center text-gray-600 text-sm">
          C 2009-2023 DSZenith, All Right Reserved
        </p>
      </div>
    </footer>
    </div>
    <div>
    <footer className='md:hidden'>
    <hr className="my-6 border-gray-500" />
    <div className="container mx-auto px-5 flex justify-start flex-col">

    {/* Logo column */}
    <div>
            <img src={ZenithEventsLogo} alt="Logo" className="h-[100px] w-[100px]" />
          </div>

    <div className='flex justify-start items-center space-x-5'>
         {/* Policies column */}
         <div className="text-left">
            <h3 className="text-md mb-3 text-gray-800">POLICIES</h3>
            <ul className="list-none">
              <li className="mb-1 text-gray-600">Privacy Policy</li>
              <li className="mb-1 text-gray-600">Terms and Conditions</li>
              <li className="mb-1 text-gray-600">Refund Policy</li>
            </ul>
          </div>

          {/* General column */}
          <div className="text-left">
            <h3 className="text-md mb-3 text-gray-800">GENERAL</h3>
            <ul className="list-none">
              <li className="mb-1 text-gray-600">FAQ</li>
              <li className="mb-1 text-gray-600">Our Team</li>
              <li className="mb-1 text-gray-600">USER GUIDE</li>
            </ul>
          </div>

    </div>
    </div>
    <hr className="my-6 border-gray-500" />
    {/* Copyright */}
    <p className="text-center text-gray-600 text-sm">
          C 2009-2023 DSZenith, All Right Reserved
        </p>
    </footer>
    </div>
    </>
  );
};

export default Footer;
