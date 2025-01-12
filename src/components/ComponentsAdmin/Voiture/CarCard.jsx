import React, { useState } from 'react';
import './CarCard.css';
import UpdateCarForm from '../UpdateCarForm/UpdateCarForm';
import { deleteCar, updateCar } from '../../../services/AdminService';

export default function CarCard({ id, marque, model, image, prix, description, onCarUpdated }) {
  const [dropdownVisibility, setVisibility] = useState(false);
  const [updatedCarData, setUpdatedCarData] = useState({ id, marque, model, image, prix, description });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageurl = 'http://localhost:8000/storage/';

  const handleFormSubmit = async (newCarData) => {
    try {
      const formData = new FormData();
      
      // Vérification des valeurs avant l'ajout
      console.log('newCarData:', newCarData); // Debug
  
      // Ajout explicite de chaque champ avec vérification
      if (newCarData.marque) formData.append('marque', newCarData.marque);
      if (newCarData.model) formData.append('model', newCarData.model);
      if (newCarData.prix) formData.append('prix', newCarData.prix);
      if (newCarData.description) formData.append('description', newCarData.description);
      
      // Debug avant envoi
      console.log('FormData contents before sending:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await updateCar(id, formData);
      console.log('Response from server:', response); // Debug
      
      if (response && response.car) {
        setUpdatedCarData(response.car);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setVisibility(false);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await deleteCar(id);
      if (response.success) {
        alert('Car deleted successfully!');
        // Optionally call a parent function to refresh the list
        if (onCarUpdated) {
          onCarUpdated(null);
        }
      } else {
        alert('Failed to delete car. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('An error occurred while deleting the car.');
    }
  };

  return (
    <div className='cardContainer' onMouseLeave={() => setVisibility(false)}>
      <h5>{updatedCarData.marque}</h5>
      <img src={imageurl + updatedCarData.image} alt={`${updatedCarData.marque} ${updatedCarData.model}`} />
      <div className="description">
        <span>Modele : {updatedCarData.model}</span>
        <span>Carburant : Essence</span>
      </div>
      <div className="prix">
        <h5>{updatedCarData.prix} dhs</h5>
        <span>/par jour</span>
      </div>
      <div className="dots" onClick={() => setVisibility(true)}>
        <span>⋮</span>
      </div>

      {dropdownVisibility && (
        <div className="dropdown">
          <ul>
            <li onClick={handleEditClick}>Edit</li>
            <li onClick={handleDelete} style={{ color: 'red' }}>Delete</li>
          </ul>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            <UpdateCarForm
              carData={updatedCarData}
              onSubmit={handleFormSubmit}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}