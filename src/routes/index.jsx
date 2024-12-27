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
  }

  
]);