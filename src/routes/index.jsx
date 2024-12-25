import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../pages/clients/LoginForm";
import Registerform from "../pages/clients/Registerform";

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
        path:"/abouts",
        element:<Registerform/>
      },
      {
        path:"*",
        element:<PageNotFound/>
      }
    ]
  }

  
]);