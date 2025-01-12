/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './CarCard.css';
import UpdateCarForm from '../UpdateCarForm/UpdateCarForm';
import { deleteCar } from '../../../services/AdminService';
import { updateCar } from '../../../services/AdminService';


export default function CarCard({ id, marque, model, image, prix, description }) {
  const [dropdownVisibility, setVisibility] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedCarData, setUpdatedCarData] = useState({ marque, model, image, prix, description });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const imageurl='http://localhost:8000/storage/';

  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal
    setVisibility(false); // Close the dropdown
  };

  const handleCloseForm = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleFormSubmit = async (newCarData) => {
    try {
      console.log('Updating car data:', newCarData);

      const response = await updateCar(id, newCarData);
      console.log('Car updated:', response);

      // Optionally, update local state with new data
      setUpdatedCarData(response); // Update the state with the new car data

      setIsModalOpen(false); // Close the modal after successful update
    } catch (error) {
      alert('Failed to update car:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this car? This action cannot be undone.'
    );
    if (!confirmDelete) return;
  
    try {
      const response = await deleteCar(id); // Call the delete API with car ID
      console.log('Delete response:', response);
  
      if (response.success) {
        alert('Car deleted successfully!');
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
      <img src={imageurl+updatedCarData.image} alt={`${updatedCarData.marque} ${updatedCarData.model}`} />
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

      {/* Modal Overlay and Content */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            <UpdateCarForm
              carData={updatedCarData}  // Pass the current data to the form
              onSubmit={handleFormSubmit}  // Pass the submit handler to the form
              onClose={handleCloseForm}    // Handle close form action
            />
          </div>
        </div>
      )}
    </div>
  );
}
