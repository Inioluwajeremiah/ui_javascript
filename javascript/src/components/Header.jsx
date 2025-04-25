import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full border flex flex-row gap-x-4 justify-center items-center">
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/signin"}>Signin</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
    </div>
  );
};

export default Header;
