import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const TransactionChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);

  useEffect(() => {
    // Fetch monthly and yearly revenue data from the server
    axiosClient
      .get('/getRevenue') // Replace with the correct API endpoint
      .then((response) => {
        setMonthlyRevenue(response.data.monthlyRevenue);
        setYearlyRevenue(response.data.totalYearlyRevenue);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='flex flex-col space-y-10 flex-1'>
      {/* Monthly Transaction Chart */}
      <div className='h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col'>
        <strong className='text-gray-700 font-medium'>Monthly Transaction of Current Year</strong>
        <div className='w-full mt-3 flex-1 text-xs'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={monthlyRevenue}
              margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3 0 0' vertical={false} />
              <XAxis dataKey='month'>
                <Label value='Month' position='bottom' offset={-10} />
              </XAxis>
              <YAxis>
                <Label
                  value='Revenue'
                  position='left'
                  angle={-90}
                  offset={-15}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Legend />
              <Bar dataKey='revenue' fill='#0ea5e9' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly Transaction Chart */}
      <div className='h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col'>
        <strong className='text-gray-700 font-medium'>Yearly Transaction</strong>
        <div className='w-full mt-3 flex-1 text-xs'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={yearlyRevenue}
              margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3 0 0' vertical={false} />
              <XAxis dataKey='year'>
                <Label value='Year' position='bottom' offset={-10} />
              </XAxis>
              <YAxis>
                <Label
                  value='Revenue'
                  position='left'
                  angle={-90}
                  offset={-15}
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Legend />
              <Bar dataKey='revenue' fill='#FF851B' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
