import React from 'react'
import './SideBar.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token'); 
    navigate('admin-login');
  }
  
  return (
    <aside className='sidebar'>
      <ul>
        <li>
          <Link class="link" to="/dashboard" >Dashboard</Link>
          </li>
        <li> <Link class="link" to="/cars-admin" >Cars</Link></li>
        <li> <Link class="link" to="/users" >Users</Link> </li>
        <li> <Link class="link" to="/dashboard" >Admins</Link> </li>
      
      </ul>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
     
    </aside>
  )
}

export default SideBar
