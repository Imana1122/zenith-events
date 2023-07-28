import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';




const BuyerProfileChart = () => {

    const [userRevenue, setUserRevenue] = useState([]);
    const [orderedEvents, setOrderedEvents] = useState([]);

    useEffect(() => {
      axiosClient
        .get('/getMostBookedEvents') // Replace with the correct API endpoint
        .then((response) => {
            setOrderedEvents(response.data.orderedEvents);

        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


    useEffect(() => {
      axiosClient
        .get('/getRevenue') // Replace with the correct API endpoint
        .then((response) => {

          setUserRevenue(response.data.userYearlyRevenue)
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


  return (
    <div className='flex flex-col gap-10'>
        <div className='w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col '>
        <strong className='text-gray-700 font-medium'>BuyerProfile</strong>
        <div className='w-full mt-3 flex-1 text-xs'>
        <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={userRevenue}
          dataKey="revenue"
          nameKey="userId"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {userRevenue.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
          </div>
    </div>
    <div className='w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col '>
        <strong className='text-gray-700 font-medium'>EventProfile</strong>
        <div className='w-full mt-3 flex-1 text-xs'>
        <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={orderedEvents}
          dataKey="booking_count"
          nameKey="eventId"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {orderedEvents.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
          </div>
    </div>
    </div>
  )
}

const getColor = (index) => {
    const colors = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#0088FE', '#00C49F',
        '#FFBB28', '#FF8042', '#7b5fc7', '#ff595e', '#ffa600', '#00adb5',
        '#7FDBFF', '#85144b', '#2ECC40', '#FF851B', '#AAAAAA', '#F012BE',
        '#3D9970', '#FF4136', '#001f3f', '#39CCCC', '#B10DC9', '#01FF70',
        '#FFDC00', '#FF0000', '#AAAA00', '#FF6F00', '#00FF00', '#00AA00',
        '#AA00AA', '#AA0000', '#AA00FF', '#00AAAA', '#AAAAFF', '#AAFFAA',
        '#AAFF00', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'
      ];
    return colors[index % colors.length];
  };


export default BuyerProfileChart
