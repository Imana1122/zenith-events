import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contents/ContextProvider";
import { PageComponent } from "../components/pagelayouts/AdminLayoutComponent";
import TButton from "../components/core/TButton";

export const GuestLayout = () => {
  // Access userToken from the application context using useStateContext hook
  const { userToken } = useStateContext();

  // If userToken is present (i.e., user is logged in), redirect to the home page
  if (userToken) {
    return <Navigate to="/" />;
  }

  // If userToken is not present (i.e., user is not logged in), render the child routes/components
  return (

        <div>
      <Outlet />
    </div>

  );
};
