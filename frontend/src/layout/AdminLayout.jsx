import React, { useEffect } from 'react'
import { Sidebar } from '../components/Admin/shred/Sidebar'
import { Header } from '../components/Admin/Header'
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contents/ContextProvider';
import axiosClient from '../axios';
import { admin } from '../admin';

export const AdminLayout = () => {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();



    if (!userToken) {
      return <Navigate to="login" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(res => {
            setCurrentUser({})
            setUserToken(null)
        })
      };
  return (
    <div className='flex flex-row bg-neutral-100 md:h-screen md:w-full sm:h-full sm:w-full lg:w-screen lg-h-screen'>
      <Sidebar logout={logout} />
      <div className='flex-1 h-screen flex flex-col'>
        <Header logout={logout} currentUser={currentUser}/>
        <div className='min-h-0 overflow-auto' >{<Outlet/> }</div>


      </div>
    </div>
  )
}
