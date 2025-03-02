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
import PrivateRoute from "./PrivateRoute";
import PostDetails from "../pages/PostDetailsSection/PostDetails";

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
            element: <PrivateRoute><MemberShip/></PrivateRoute>
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
        {
            path: '/register',
            element: <Register></Register>,
        },
        {
            path: '/post-details/:id',
            element: <PrivateRoute><PostDetails/></PrivateRoute>,
        },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: 'addPost',
          element: <PrivateRoute><AddPost/></PrivateRoute>
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