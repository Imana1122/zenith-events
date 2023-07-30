import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Events } from './view/admin/Events';
import { Dashboard } from './view/admin/Dashboard';
import NewEvent from './view/admin/NewEvent';
import { NewTrainer } from './view/admin/NewTrainer';
import Bookings from './view/admin/Bookings';
import { Trainers } from './view/admin/Trainers';
import { AdminLayout } from './layout/AdminLayout';
import Edit from './view/profile/Edit';
import DefaultLayout from './layout/DefaultLayout';
import EsewaSuccess from './components/cart-form/EsewaSuccess';
import { Training } from './view/user/Training';
import { GuestLayout } from './layout/GuestLayout';
import Login from './view/auth/Login';
import Signup from './view/auth/Signup';
import VerifyPhone from './view/auth/VerifyPhone';
import VerifyCode from './view/auth/VerifyCode';
import ResetPassword from './view/auth/ResetPassword';
import { ContextProvider, useStateContext } from './contents/ContextProvider';
import { Toaster } from 'react-hot-toast';
import { admin } from './admin';
import Home from './view/user/Home';
import EventDetails from './view/user/EventDetails';
import CartForm from './view/user/CartForm';
import CustomerDetails from './components/cart-form/CustomerDetails';
import EsewaPayment from './components/cart-form/EsewaPayment';
import { UserBookings } from './view/profile/UserBookings';
import EsewaFailure from './components/cart-form/EsewaFailure';
import LandingPage from './view/LandingPage';
import { Users } from './view/admin/Users';

const AppRouter = () => {
  const { currentUser, userToken } = useStateContext();

  return (
    <Routes>
      {/* Admin routes */}
      {currentUser?.email === admin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<NewEvent />} />
          <Route path="/events/update/:eventId" element={<NewEvent />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/create" element={<NewTrainer />} />
          <Route path="/trainers/update/:trainerId" element={<NewTrainer />} />
          <Route path="/profile" element={<Edit />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
          {/* Navigate to home page for all other unmatched URLs */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        /* Regular user routes */
        !userToken ? (
          /* Guest routes */
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-phone" element={<VerifyPhone />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Redirect to login page for all other unmatched URLs */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        ) : (
          /* Authenticated user routes */
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/event/:id/cart-form" element={<CartForm />} />
            <Route path="/event/:id/cart-form/customer-details" element={<CustomerDetails />} />
            <Route path="/esewa" element={<EsewaPayment />} />
            <Route path="/success" element={<EsewaSuccess />} />
            <Route path="/failure" element={<EsewaFailure />} />
            <Route path="/profile" element={<Edit />} />
            <Route path="/userBookings" element={<UserBookings />} />
            <Route path="/training" element={<Training />} />
            <Route path="*" element={<Navigate to="/" />}/>
          </Route>
        )
      )}
    </Routes>
  );
};

const RouteApp = () => {
  return (
    <ContextProvider>
      <Router>
        <AppRouter />
      </Router>
      <Toaster />
    </ContextProvider>
  );
};

export default RouteApp;
