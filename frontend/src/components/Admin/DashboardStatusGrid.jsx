import React, { useEffect, useState } from 'react';
import { IoBagHandle, IoCashOutline, IoPeopleOutline, IoTicket } from 'react-icons/io5';
import axiosClient from '../../axios';

export const DashboardStatusGrid = () => {
  const [bookings, setBookings] = useState([]);
  const [yetToBeBookings, setYetToBeBookings] = useState([]);
  const [thisMonthRevenue, setThisMonthRevenue] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [users, setUsers] = useState([]);
  const [thisMonthUsers, setThisMonthUsers] = useState([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const currentYear = currentDate.getFullYear();

  // Fetch data for total and this month's revenue
  useEffect(() => {
    axiosClient
      .get('/getRevenue') // Replace with the correct API endpoint
      .then((response) => {
        const currentYearRevenue = response.data.totalYearlyRevenue.find(entry => entry.year === currentYear);
        const yearlyRevenue = currentYearRevenue ? currentYearRevenue.revenue : '';
        setTotalRevenue(yearlyRevenue);

        const currentMonthRevenue = response.data.monthlyRevenue.find(entry => entry.month === currentMonth);
        const monthlyRevenue = currentMonthRevenue ? currentMonthRevenue.revenue : '';
        setThisMonthRevenue(monthlyRevenue);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch data for bookings and yet to be bookings
  useEffect(() => {
    axiosClient
      .get('/bookings') // Replace with the correct API endpoint
      .then((response) => {
        setBookings(response.data.bookings);
        setYetToBeBookings(response.data.yetToBeBookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch data for total users and this month's new users
  useEffect(() => {
    axiosClient
      .get('/getUsers') // Replace with the correct API endpoint
      .then((response) => {
        setUsers(response.data.users);
        setThisMonthUsers(response.data.thisMonthUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='flex gap-4 w-full'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoTicket className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Total Tickets</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>333</strong>
            <span className='text-sm text-green-500 pl-2'>+234</span>
          </div>
        </div>
      </BoxWrapper>
      {/* Other BoxWrapper components follow with different icons and data */}
    </div>
  );
};

function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}
