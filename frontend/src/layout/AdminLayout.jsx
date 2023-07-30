// pages/AdminLayout.js

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Admin/shred/Sidebar';
import { Header } from '../components/Admin/Header';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contents/ContextProvider';
import axiosClient from '../axios';

export const AdminLayout = () => {
  // Get userToken and currentUser from the context
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();





  // If the user is not logged in (userToken is empty), redirect to the login page
  if (!userToken) {
    return <Navigate to="login" />;
  }

  // Function to handle user logout
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
      });
  };



  return (
    <div className='flex flex-row bg-neutral-100 md:h-screen md:w-full sm:h-full sm:w-full lg:w-screen lg-h-screen'>
      {/* Sidebar component */}
      <Sidebar logout={logout} />

      <div className='flex-1 h-screen flex flex-col'>
        {/* Header component */}
        <Header logout={logout} currentUser={currentUser} />

        <div className='min-h-0 overflow-auto'>
          {/* Outlet to render child routes */}
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};
