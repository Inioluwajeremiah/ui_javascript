import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogin = false;

  return isLogin === false ? <Outlet /> : <Navigate to={"/signin"} replace />;
};

export default ProtectedRoutes;
