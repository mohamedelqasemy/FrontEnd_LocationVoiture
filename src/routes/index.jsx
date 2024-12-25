import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../pages/clients/LoginForm";
import Registerform from "../pages/clients/Registerform";
import Profile from "../pages/clients/Profile";
import Abouts from './../pages/clients/Abouts';

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
        path:"*",
        element:<PageNotFound/>
      }
    ]
  }

  
]);