import React from "react"
import { Redirect } from "react-router-dom"

//Components
import Login from "../pages/Authentication/Login"
import Home from "../pages/Home"
import Users from "../pages/Users"
import ComingSoon from "../pages/ComingSoon"
import Payment from "../pages/Payment"
import UserDetails from "../pages/Users/userDetails"

const authProtectedRoutes = [
  { path: "/home", component: Home },
  { path: "/users", component: Users },
  { path: "/users/details/:id", component: UserDetails },
  { path: "/payments", component: Payment },
  { path: "/files", component: ComingSoon },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
