import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Clubs from "../pages/Clubs/Clubs";
import Events from "../pages/Events/Events";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "clubs", element: <Clubs /> },
      { path: "events", element: <Events /> },
      { path: "events-registrations", element: <EventRegistrations /> },
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
]);
