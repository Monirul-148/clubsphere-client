import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Clubs from "../pages/Clubs/Clubs";
import Events from "../pages/Events/Events";
import { path } from "framer-motion/client";
import { Component } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";


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
  {
     path: '/',
  Component: AuthLayout,
  children: [
    {
      path: 'login',
      Component: Login
    },
    {
      path: 'register',
      Component: Register
    },
    
  ]

  }
 
]);