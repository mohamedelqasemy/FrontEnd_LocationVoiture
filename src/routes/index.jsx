import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../pages/clients/Home";
import PageNotFound from "../pages/PageNotFound";
import LoginForm from "../pages/clients/LoginForm";

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
        path:"*",
        element:<PageNotFound/>
      }
    ]
  }

  
]);