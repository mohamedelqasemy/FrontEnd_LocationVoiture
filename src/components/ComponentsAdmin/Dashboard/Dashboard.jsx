import React, { useEffect } from 'react';
import './Dashboard.css';
import { Link,Outlet ,useNavigate} from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('overview', { replace: true });
  }, [navigate]);

  return (
    <div className="DashboardContainer">
      <nav>
        <ul>
          <li>
            <Link className="link" to="overview">Overview</Link>
          </li>
          <li>
            <Link className="link" to="analytics">Analytics</Link>
          </li>
        </ul>
      </nav>
      <div className="ContentOfDashboard">
        {/* The Outlet is used here to render nested routes */}
        <Outlet />
      </div>
    </div>
  );
}
