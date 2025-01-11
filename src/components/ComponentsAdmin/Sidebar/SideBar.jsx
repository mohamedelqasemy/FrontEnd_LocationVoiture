import React from 'react'
import './SideBar.css'
import { Link } from "react-router-dom";

function SideBar() {
   
  
  return (
    <aside className='sidebar'>
      <ul>
        <li>
          <Link class="link" to="/dashboard" >Dashboard</Link>
          </li>
        <li> <Link class="link" to="/cars-admin" >Cars</Link></li>
        <li> <Link class="link" to="/" >Users</Link> </li>
        <li> <Link class="link" to="/" >Admins</Link> </li>
      
      </ul>
        <div className="logout">

         <button >logout</button>

        </div>
     
    </aside>
  )
}

export default SideBar
