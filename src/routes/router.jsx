import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Clubs from "../pages/Home/Home/Clubs";
import Events from "../pages/Home/Home/Events";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: "clubs",
            Component: Clubs
        },
        {
            path: "events",
            Component: Events
        },
        
    ]
  },
]);