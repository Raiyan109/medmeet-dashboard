import { Navigate } from "react-router-dom";
import localStorageUtil, {
  setItemWithExpiration,
} from "../utils/localstorageutils";
import useAuth from "../hooks/useAuth";

export default function ProtectResetPassRoute({ children }) {
  const isTokenAvailable = localStorageUtil.getItem("token");
  const isEmailVerified = localStorageUtil.getItem("rpev");
  const user = useAuth();

  if (
    isTokenAvailable &&
    user?._id &&
    user?.role === "SUPER_ADMIN" &&
    isEmailVerified
  ) {
    return children;
  } else {
    setItemWithExpiration(
      "evMessage",
      "Please verify your email first.",
      2 / 60
    );
    return <Navigate to={"/settings/change-password/forgot-password"} />;
  }
}
