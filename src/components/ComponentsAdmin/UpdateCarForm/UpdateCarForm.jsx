import React, { useState } from 'react';
import { updateCar } from '../../../services/AdminService'; 

export default function UpdateCarForm({Id,carData, onSubmit, onClose }) {
  const [updatedCarData, setUpdatedCarData] = useState({
    marque: carData?.marque || '',
    model: carData?.model || '',
    image: carData?.image || '',
    prix: carData?.prix || '',
    description: carData?.description || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading
    setError(null);  // Reset previous error
  
    try {
      const formData = new FormData();
      formData.append('marque', updatedCarData.marque);
      formData.append('model', updatedCarData.model);
      formData.append('prix', updatedCarData.prix);
      formData.append("dateSerie", parseInt(updatedCarData.dateSerie, 10));
      formData.append('description', updatedCarData.description);
  
      if (updatedCarData.image instanceof File) {
        formData.append('carImage', updatedCarData.image);
      }
  
      console.log('Sending data to API:', Object.fromEntries(formData.entries()));
  
      const response = await updateCar(Id, formData);
      console.log('Car updated:', response);
  
      onSubmit(response);  // Pass updated car data to parent
    } catch (error) {
      console.error('Error updating car:', error.response ? error.response.data : error.message);
      setError('Failed to update car. Please try again.');
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Car</h2>
      {isLoading && <p>Updating car...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Marque:</label>
        <input
          type="text"
          name="marque"
          value={updatedCarData.marque}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={updatedCarData.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setUpdatedCarData((prevData) => ({
              ...prevData,
              image: e.target.files[0],  // Store the file object
            }))
          }
        />
      </div>
      
      <div>
        <label>Prix:</label>
        <input
          type="text"
          name="prix"
          value={updatedCarData.prix}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedCarData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>Update Car</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}
