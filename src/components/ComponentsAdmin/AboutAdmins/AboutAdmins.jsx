import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch the admin data from the API
    axios.get('http://localhost:8000/api/admins')
      .then(response => {
        setAdmins(response.data); // Save the admin data to state
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
      });
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Team</h1>
      <div className="admin-cards-container">
        {admins.map(admin => (
          <div className="admin-card" key={admin.id}>
            <img
              src={`http://localhost:8000/storage/${admin.image}`} // Display image from storage
              alt={admin.nom}
              className="admin-image"
            />
            <h2>{admin.nom}</h2>
            <p>Joined on: {new Date(admin.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
