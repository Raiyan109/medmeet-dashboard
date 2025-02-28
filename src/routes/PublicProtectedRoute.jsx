import React from "react";
import localStorageUtil, {
  setItemWithExpiration,
} from "../utils/localstorageutils";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PublicProtectedRoute({ children }) {
  const user = useAuth();
  const resetPassToken = localStorageUtil.getItem("resetPassToken");

  if (user && user?._id) {
    return <Navigate to={"/"} />;
  } else {
    if (!resetPassToken) {
      setItemWithExpiration(
        "evMessage",
        "Please verify your email first.",
        2 / 60
      );
      return <Navigate to={"/auth/forgot-password"} />;
    } else {
      return children;
    }
  }
}
