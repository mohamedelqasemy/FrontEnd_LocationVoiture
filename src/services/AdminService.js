import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';


export const getCars = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cars`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Erreur lors de la récupération des voitures';
    }
  };

  export const getReservationsAdmin = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/reservations-admin`, {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Erreur lors de la récupération des réservations';
    }
  };
 
  export const createCar = async (formData) => {
    try {
      console.log('Sending request to API...');
      const response = await axios.post('http://localhost:8000/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error.message);
      alert(`Failed to create car: ${error.response ? error.response.data.message : error.message}`);
      throw error.response ? error.response.data : 'Failed to create car';
    }
  };

  export const updateCar = async (carId, formData) => {
    try {
      const response = await axios.put(`${apiUrl}/cars/${carId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error.message);
      throw error.response ? error.response.data : 'Failed to update car';
    }
  };
  
  
  

  export const deleteCar = async (carId) => {
    try {
      const response = await axios.delete(`${apiUrl}/cars/${carId}`);
      return response.data; 
    } catch (error) {
      console.error('API error:', error.response || error.message);
      throw error.response ? error.response.data : 'Failed to delete car';
    }
  };
  
  
  
  
  
  
  