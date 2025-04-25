import React, { useEffect } from "react";
import { useNavigate, useNavigation, useRoutes } from "react-router-dom";

const Dashboard = () => {
  const isLogin = false;

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/signup");
    }
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
