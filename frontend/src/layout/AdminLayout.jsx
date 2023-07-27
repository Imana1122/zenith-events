import React, { useEffect } from 'react'
import { Sidebar } from '../components/Admin/shred/Sidebar'
import { Header } from '../components/Admin/Header'
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contents/ContextProvider';
import axiosClient from '../axios';
import { admin } from '../admin';

export const AdminLayout = () => {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
console.log(currentUser)
    // useEffect(() => {
    //   setCurrentUser(JSON.parse(localStorage.getItem('USER')));
    // }, []); // Run the effect only once when the component mounts

    useEffect(() => {
      console.log(currentUser.email, currentUser.id, currentUser.name);
    }, [currentUser]); // Run the effect when the currentUser values change


    if (!userToken) {
      return <Navigate to="login" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        console.log(currentUser, userToken)
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
