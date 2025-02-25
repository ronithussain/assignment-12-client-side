import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Dashboard/Dashboard";
import AddPost from "../Dashboard/AddPost";
import MyPost from "../Dashboard/MyPost";
import MyProfile from "../Dashboard/MyProfile";
import MemberShip from "../pages/MemberShip";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/memberShip',
            element: <MemberShip></MemberShip>
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
        {
            path: '/register',
            element: <Register></Register>,
        },
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'addPost',
          element: <AddPost></AddPost>
        },
        {
          path: 'myPost',
          element: <MyPost></MyPost>
        },
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },
      ]
    },
  ]);