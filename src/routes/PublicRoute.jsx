import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = useAuth();

  if (user && user?._id) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
