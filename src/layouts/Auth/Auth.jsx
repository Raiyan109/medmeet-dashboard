import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="mx-auto px-4 lg:px-8 2xl:px-0 py-2 lg:py-8 bg-[#B0B0B0] flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};

export default Auth;
