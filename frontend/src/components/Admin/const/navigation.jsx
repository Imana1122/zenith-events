import React from 'react'
import { HiOutlineCube, HiOutlineCog, HiOutlineQuestionMarkCircle, HiOutlineViewGrid} from 'react-icons/hi'
import {IoBagHandle,IoPeopleOutline} from 'react-icons/io5'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "dashborad",
        label: "Dashboard",
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key:'events',
        label:'Events',
        path: '/events',
        icon: <HiOutlineCube/>
    },
    {
        key:'trainers',
        label:'Trainers',
        path: '/trainers',
        icon: <IoPeopleOutline/>

    },
    {
        key:'bookings',
        label:'Bookings',
        path: '/bookings',
        icon: <IoBagHandle/>
    },
    {
        key:'users',
        label:'Users',
        path: '/users',
        icon: <IoPeopleOutline className='text-yellow-600'/>
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        path: '/',
        icon: <HiOutlineCog />
    },
    {
        key:'support',
        label:'Help and Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle/>
    }
]

