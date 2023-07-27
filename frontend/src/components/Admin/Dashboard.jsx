import React from 'react'
import { Link } from 'react-router-dom'
import { DashboardStatusGrid } from './DashboardStatusGrid'
import TransactionChart from './TransactionChart'
import BuyerProfileChart from './BuyerProfileChart'
import RecentBookings from './RecentBookings'
import PopularEvents from './PopularEvents'

export const Dashboard = () => {
  return (
    <div className='flex gap-4 flex-col'>
     <DashboardStatusGrid />
     <div className='flex flex-row gap-4 w-full'>
        <TransactionChart />
        <BuyerProfileChart />
     </div>
     
    </div>
  )
}
