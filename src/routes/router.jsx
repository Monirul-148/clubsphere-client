import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home/Home";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/Clubs/ClubDetails";
import Events from "../pages/Events/Events";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";



// Dashboard - Manager
import ManagerHome from "../pages/Dashboard/Manager/ManagerHome";
import CreateClub from "../pages/Dashboard/Manager/CreateClub";
import MyClubs from "../pages/Dashboard/Manager/MyClubs";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";

// Dashboard - Member
import MemberHome from "../pages/Dashboard/Member/MemberHome";
import JoinClub from "../pages/Dashboard/Member/JoinClub";
import MyEvents from "../pages/Dashboard/Member/MyEvents";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import ErrorPage from "../pages/Error/ErrorPage";

export const router = createBrowserRouter([
  // 🌍 Public Routes
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <ErrorPage />, // 🔥 Assignment requirement
    children: [
      { index: true, element: <Home /> },
      { path: "clubs", element: <Clubs /> },
      { path: "clubs/:id", element: <ClubDetails /> },
      { path: "events", element: <Events /> },
    ],
  },

  // 🔐 Auth Routes
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // 📊 Dashboard Routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Manager
      { index: true, element: <ManagerHome /> },
      { path: "create-club", element: <CreateClub /> },
      { path: "my-clubs", element: <MyClubs /> },
      { path: "event-registrations", element: <EventRegistrations /> },

      // Member
      { path: "member", element: <MemberHome /> },
      { path: "member/join-club", element: <JoinClub /> },
      { path: "member/join-club/:id", element: <JoinClub /> },
      { path: "member/my-clubs", element: <MyClubs /> },
      { path: "member/my-events", element: <MyEvents /> },
      { path: "member/payments", element: <PaymentHistory /> },
    ],
  },
]);
