import React, { useState } from 'react';
import './Form.css';
import { createCar } from '../../../services/AdminService';


function Form({ onClose }) {
  // State for form inputs
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    serialDate: '',
    price: '',
    description: '',
    carImage: null,
  });

  // State to hold the selected image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, carImage: file })); // Store the file in state
      setImagePreview(URL.createObjectURL(file)); // Show the image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('brand', formData.brand);  // Accessing from state
    formDataToSend.append('model', formData.model);
    formDataToSend.append('serialDate', formData.serialDate);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);

    if (formData.carImage) { // Accessing the selected image from state
      formDataToSend.append('carImage', formData.carImage);
    }

    try {
      const newCar = await createCar(formDataToSend); // Call the createCar function
      alert('Car added successfully!');
      console.log(newCar);
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car.');
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      brand: '',
      model: '',
      serialDate: '',
      price: '',
      description: '',
      carImage: null,
    });
    setImagePreview(null); // Clear the image preview
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Add a New Car</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            placeholder="Enter Car Brand ..."
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />

          <label htmlFor="model">Model</label>
          <input
            type="text"
            placeholder="Enter Car Model ..."
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />

          <label htmlFor="serialDate">Serial Date</label>
          <input
            type="text"
            placeholder="Enter Car Serial Date ..."
            name="serialDate"
            value={formData.serialDate}
            onChange={handleInputChange}
          />

          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="Enter Car Price ..."
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Enter Your description ..."
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          {/* Image Upload Field */}
          <label htmlFor="carImage">Upload Car Image</label>
          <input
            type="file"
            accept="image/*"
            id="carImage"
            name="carImage"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Car Preview" width="100%" />
            </div>
          )}

          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </form>

        {/* Close the modal */}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Form;
