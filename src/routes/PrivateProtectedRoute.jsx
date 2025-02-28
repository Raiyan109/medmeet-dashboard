import React from "react";
import { Navigate } from "react-router-dom";
import localStorageUtil from "../utils/localstorageutils";
import useAuth from "../hooks/useAuth";

export default function PrivateProtectedRoute({ children }) {
  const isTokenAvailable = localStorageUtil.getItem("token");

  const user = useAuth();

  if (isTokenAvailable && user?._id && user?.role === "SUPER_ADMIN") {
    return children;
  } else {
    return <Navigate to={"/auth/sign-in"} />;
  }
}
