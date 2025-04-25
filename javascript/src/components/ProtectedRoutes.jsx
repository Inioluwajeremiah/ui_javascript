import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { userInfo, menuInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedRoutes;
