import { CiSettings, CiUser } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Guests from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import AboutUs from "../pages/Settings/AboutUs";
import Notifications from "../pages/Main/Notifications/Notifications";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiBars4 } from "react-icons/hi2";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import { LuWallet } from "react-icons/lu";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { PiHandWithdrawBold } from "react-icons/pi";
import StudioPost from "../pages/Main/ApproveRequest/StudioPost";
import TrainerPost from "../pages/Main/ApproveRequest/TrainerPost";
import Review from "../pages/Main/Users/Review";
import StudioList from "../pages/Main/StudioList/StudioList";
import TrainerList from "../pages/Main/TrainerList/TrainerList";
import Earnings from "../pages/Main/Earnings/Earnings";
import DriverRequest from "../pages/Main/DriverRequest/DriverRequest";
import Setting from "../pages/Main/Setting/Setting";
import Support from "../pages/Main/Support/Support";
import earningImg from "../assets/images/earnings.png";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { TbCash } from "react-icons/tb";
import { PiLaptopThin } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";
import Doctor from "../pages/Main/Doctor/Doctor";
import Appointments from "../pages/Main/Appointments/Appointments";
import Categories from "../pages/Main/Categories/Categories";
import WithdrawRequest from "../pages/Main/WithdrawRequest/WithdrawRequest";
import SetPercentage from "../pages/Settings/SetPercentage";
import ResetPassword from "../pages/Main/Setting/Change-password/ResetPassword";
import { GiMedicines } from "react-icons/gi";
import ManageMedicine from "../pages/Main/Medicine/ManageMedicine";
import PrivateProtectedRoute from "../routes/PrivateProtectedRoute";
import ProtectResetPassRoute from "../routes/ProtectResetPassRoute";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: (
      <PrivateProtectedRoute>
        <DashboardHome />
      </PrivateProtectedRoute>
    ),
  },

  // {
  //   name: "Approve Request",
  //   rootPath: "approveRequest",
  //   icon: GrMoney,
  //   children: [
  //     {
  //       name: "Studio Post",
  //       path: "approveRequest/all-earnings",
  //       icon: LuWallet,
  //       element: <StudioPost />,
  //     },
  //     {
  //       name: "Trainer Post",
  //       path: "approveRequest/withdraw",
  //       icon: PiHandWithdrawBold,
  //       element: <TrainerPost />,
  //     },
  //   ],
  // },
  {
    path: "notifications",
    element: (
      <PrivateProtectedRoute>
        <Notifications />
      </PrivateProtectedRoute>
    ),
  },
  // {
  //   path: '/reviews',
  //   element: <Review></Review>
  // },

  {
    name: "Earnings",
    path: "earnings",
    icon: TbCash,
    element: (
      <PrivateProtectedRoute>
        <Earnings />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Users",
    path: "users",
    icon: HiOutlineUsers,
    element: (
      <PrivateProtectedRoute>
        <Guests />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Doctors",
    path: "doctor",
    icon: HiOutlineUsers,
    element: (
      <PrivateProtectedRoute>
        <Doctor />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Manage Request",
    path: "manage-request",
    icon: PiLaptopThin,
    element: (
      <PrivateProtectedRoute>
        <DriverRequest />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Appointments",
    path: "appointments",
    icon: HiOutlineCalendar,
    element: (
      <PrivateProtectedRoute>
        <Appointments />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Categories",
    path: "categories",
    icon: HiBars4,
    element: (
      <PrivateProtectedRoute>
        <Categories />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Withdrawal Request",
    path: "withdrawal-request",
    icon: TbCoin,
    element: (
      <PrivateProtectedRoute>
        <WithdrawRequest />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Manage Medicine",
    path: "manage-medicine",
    icon: GiMedicines,
    element: (
      <PrivateProtectedRoute>
        <ManageMedicine />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Setting",
    path: "settings",
    icon: IoSettingsOutline,
    element: (
      <PrivateProtectedRoute>
        <Setting />
      </PrivateProtectedRoute>
    ),
  },

  // {
  //   path: "/hosts/:id",
  //   element: <HostDetails />,
  // },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: (
          <PrivateProtectedRoute>
            <MyProfile />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/profile/edit",
        element: (
          <PrivateProtectedRoute>
            <EditMyProfile />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: (
          <PrivateProtectedRoute>
            <ChangePassword />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password",
        element: (
          <PrivateProtectedRoute>
            <ForgotPassword />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: (
          <PrivateProtectedRoute>
            <VerifyEmail />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password/verify-email/reset-pass",
        element: (
          <ProtectResetPassRoute>
            <ResetPassword />
          </ProtectResetPassRoute>
        ),
      },
      {
        name: "Set Percentage for transaction",
        icon: FaServicestack,
        path: "settings/set-percentage",
        element: (
          <PrivateProtectedRoute>
            <SetPercentage />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Terms & Condition",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: (
          <PrivateProtectedRoute>
            <TermsConditions />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/terms-conditions/edit",
        element: (
          <PrivateProtectedRoute>
            <EditTermsConditions />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: (
          <PrivateProtectedRoute>
            <PrivacyPolicy />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/privacy-policy/edit",
        element: (
          <PrivateProtectedRoute>
            <EditPrivacyPolicy />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "About Us",
        icon: BiMessageSquareDetail,
        path: "settings/about",
        element: (
          <PrivateProtectedRoute>
            <AboutUs />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/about/edit",
        element: (
          <PrivateProtectedRoute>
            <EditAboutUs />
          </PrivateProtectedRoute>
        ),
      },
    ],
  },
];
