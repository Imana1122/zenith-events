import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contents/ContextProvider";


export const GuestLayout = () => {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet/>
    </div>
  );
};
