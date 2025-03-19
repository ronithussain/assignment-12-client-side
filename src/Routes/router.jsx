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
import Membership from "../pages/PaymentMembershipPage/Membership";
import PrivateRoute from "./PrivateRoute";
import PostDetails from "../pages/PostDetailsSection/PostDetails";
import ViewComments from "../Dashboard/ViewComments";
import AdminProfile from "../Dashboard/AdminRoutes/AdminProfile";
import ManageUsers from "../Dashboard/AdminRoutes/ManageUsers";
import ReportedActivities from "../Dashboard/AdminRoutes/ReportedActivities";
import MakeAnnouncement from "../Dashboard/AdminRoutes/MakeAnnouncement";
import AdminRoute from "./AdminRoute";


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
            element: <PrivateRoute><Membership/></PrivateRoute>
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
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'addPost',
          element: <PrivateRoute><AddPost/></PrivateRoute>
        },
        {
          path: 'myPost',
          element: <PrivateRoute><MyPost/></PrivateRoute>
        },
        {
          path: "comments/:postId",
          element: <PrivateRoute><ViewComments /></PrivateRoute>
        },
        {
          path: 'myProfile',
          element: <PrivateRoute><MyProfile/></PrivateRoute>
        },

        //admin routes start here---------------------------------
        {
          path: 'adminProfile',
          element: <AdminRoute><AdminProfile/></AdminRoute>
        },
        {
          path: 'manageUsers',
          element: <AdminRoute><ManageUsers/></AdminRoute>
        },
        {
          path: "reportedActivities",
          element: <AdminRoute><ReportedActivities/></AdminRoute>
        },
        {
          path: 'makeAnnouncement',
          element: <AdminRoute><MakeAnnouncement/></AdminRoute>
        },
      ]
    },
  ]);