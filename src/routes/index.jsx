import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../pages/clients/LoginForm";
import Registerform from "../pages/clients/Registerform";
import Profile from "../pages/clients/Profile";
import Abouts from './../pages/clients/Abouts';
import SearchCar from "../pages/clients/SearchCar";
import MyReservation from "../pages/clients/MyReservation";
import Bookings from "../pages/clients/Bookings";
import ContactUs from "../components/CompenentsClients/ComponentCoontactUs/ContactUs";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../components/ComponentsAdmin/Dashboard/Dashboard";
import Overview from "../components/ComponentsAdmin/Dashboard/Overview";
import CarsAdmin from "../pages/admin/CarsAdmin";
import  Login  from "../components/ComponentsAdmin/Login/Login";
import { FetchUsers } from "../pages/admin/FetchUsers";
import Stats from "../components/ComponentsAdmin/Dashboard/Stats";

export const router = createBrowserRouter([
  {
    element:<ClientLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<LoginForm/>
      },
      {
        path:"/cars",
        element:<SearchCar/>
      },
      {
        path:"/myreservations",
        element:<MyReservation/>
      },
      {
        path:"/register",
        element:<Registerform/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/contact",
        element:<ContactUs/>
      },
      {
        path:"/abouts",
        element:<Abouts/>
      },
      {
        path:"/bookings",
        element:<Bookings/>
      },
      {
        path:"*",
        element:<PageNotFound/>
      }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "overview", element: <Overview /> },
          { path: "analytics", element: <Stats /> },
        ],
      },
      {
        path:"/cars-admin",
        element: <CarsAdmin/>
      },

      {
        path: "/NewCarForm",
        element: <form/>
      },
      {
        path: "/users",
        element: <FetchUsers />,
      },
    ],
  },
  {
    path: "/admin-login", // Add the route for admin login
    element: <Login/>,
  },
]);