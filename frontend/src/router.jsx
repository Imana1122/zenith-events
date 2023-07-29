import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import CartForm from "./view/CartForm";
import { GuestLayout } from "./layout/GuestLayout";
import Home from "./view/Home";
import CustomerDetails from "./components/CartForm/CustomerDetails";
import EventDetails from "./view/EventDetails";
import { ContextProvider, useStateContext } from "./contents/ContextProvider";
import { Toaster } from "react-hot-toast";
import { admin } from "./admin";
import EsewaPayment from "./components/CartForm/EsewaPayment";
import EsewaSuccess from "./components/CartForm/EsewaSuccess";
import { Dashboard } from "./components/Admin/Dashboard";
import { AdminLayout } from "./layout/AdminLayout";
import { Events } from "./components/Admin/Events";
import { NewEvent } from "./components/Admin/NewEvent";
import Bookings from "./components/Admin/Bookings";
import { NewTrainer } from "./components/Admin/NewTrainer";
import { Trainers } from "./components/Admin/Trainers";
import Signup from "./view/auth/Signup";
import Login from "./view/auth/Login";
import VerifyCode from "./view/auth/VerifyCode";
import VerifyPhone from "./view/auth/VerifyPhone";
import Edit from "./view/profile/Edit";
import ResetPassword from "./view/auth/ResetPassword";
import { UserBookings } from "./view/profile/UserBookings";
import EsewaFailure from "./components/CartForm/EsewaFailure";
// import { useMediaQuery } from "@mui/material";

const AppRouter = () => {
  const { currentUser, events } = useStateContext();
//   const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Routes>

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
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
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
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Route>
      )}

      <Route path="/" element={<GuestLayout />}>
         <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Login />} />
      </Route>


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
