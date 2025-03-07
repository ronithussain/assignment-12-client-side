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
import ViewComments from "../Dashboard/ViewComments";
import AdminProfile from "../Dashboard/AdminRoutes/AdminProfile";
import ManageUsers from "../Dashboard/AdminRoutes/ManageUsers";
import ReportedActivities from "../Dashboard/AdminRoutes/ReportedActivities";
import MakeAnnouncement from "../Dashboard/AdminRoutes/MakeAnnouncement";

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
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
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
          path: "comments/:id",
          element: <PrivateRoute><ViewComments /></PrivateRoute>
        },
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },

        //admin routes start here---------------------------------
        {
          path: 'adminProfile',
          element: <PrivateRoute><AdminProfile/></PrivateRoute>
        },
        {
          path: 'manageUsers',
          element: <PrivateRoute><ManageUsers/></PrivateRoute>
        },
        {
          path: "reportedActivities",
          element: <PrivateRoute><ReportedActivities /></PrivateRoute>
        },
        {
          path: 'makeAnnouncement',
          element: <MakeAnnouncement/>
        },
      ]
    },
  ]);