import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import SignIn from "../pages/Auth/SignIn";
import { routesGenerators } from "../utils/routesGenerators";
import { dashboardItems } from "../constants/router.constants";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import ChatPage from "../pages/Main/Support/ChatPage";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import PublicRoute from "./PublicRoute";
import PublicProtectedRoute from "./PublicProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: routesGenerators(dashboardItems),
  },
  {
    path: "/support-chat",
    element: <ChatPage />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/sign-in"} />,
      },
      {
        path: "/auth/sign-in",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/auth/forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "/auth/verify-email",
        element: (
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        ),
      },
      {
        path: "/auth/reset-password",
        element: (
          <PublicProtectedRoute>
            <ResetPassword />
          </PublicProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    //   element: <NotFound />,
  },
]);

export default router;
