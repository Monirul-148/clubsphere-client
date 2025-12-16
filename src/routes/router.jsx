// src/routes/router.jsx
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "clubs", element: <Clubs /> },
      { path: "clubs/:id", element: <ClubDetails /> },
      { path: "events", element: <Events /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ManagerHome /> },
      { path: "create-club", element: <CreateClub /> },
      { path: "my-clubs", element: <MyClubs /> },
      { path: "event-registrations", element: <EventRegistrations /> },
    ],
  },
  // Catch-all 404 route
  {
    path: "*",
    element: <h2 className="text-center mt-10 text-2xl">404 - Page Not Found</h2>,
  },
]);
