import React from 'react'
import SideBar from '../components/ComponentsAdmin/Sidebar/SideBar'
import { Outlet, useNavigate } from "react-router-dom";


import './AdminLayout.css'
export default function AdminLayout() {
  return (
    <div className="AdminLayoutContainer">
      <SideBar></SideBar>
      <div className='rightside'>
      <Outlet/>

      </div>


    </div>
  )
}
