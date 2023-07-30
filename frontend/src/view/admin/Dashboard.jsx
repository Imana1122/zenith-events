import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardStatusGrid } from '../../components/admin/DashboardStatusGrid';
import TransactionChart from '../../components/admin/TransactionChart';
import BuyerProfileChart from '../../components/admin/BuyerProfileChart';
import RecentBookings from '../../components/admin/RecentBookings';
import PopularEvents from '../../components/admin/PopularEvents';

export const Dashboard = () => {
  return (
    <div className='flex gap-4 flex-col'>
      {/* Dashboard Status Grid */}
      <DashboardStatusGrid />

      {/* Transaction and Buyer Profile Charts */}
      <div className='flex flex-row gap-4 w-full'>
        <TransactionChart />
        <BuyerProfileChart />
      </div>


    </div>
  );
};
