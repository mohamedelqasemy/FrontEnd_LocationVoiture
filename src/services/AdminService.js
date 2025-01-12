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
      const response = await axios.post(`${apiUrl}/cars`, formData, {
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
      // Debug avant envoi
      console.log('Sending FormData to backend:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Assurez-vous que l'URL est correcte
      const response = await axios({
        method: 'post', // Changez en POST au lieu de PUT pour multipart/form-data
        url: `${apiUrl}/cars/${carId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'X-HTTP-Method-Override': 'PUT' // Pour indiquer que c'est un PUT
        },
        withCredentials: true
      });
  
      console.log('Response from backend:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('API error:', error.response || error.message);
      throw error;
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
  
  // Fonction pour récupérer la liste des vlients
export const getClients = async () => {
  try {
    const response = await axios.get(`${apiUrl}/clients`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : "Erreur lors de la récupération des clients";
  }
};
export const adminlogin = async (credentials) => {
  try {
    const response = await axios.post(
      `${apiUrl}/admins/adminlogin`,
      credentials
    );
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error("Error during login:", error);
    throw error.response ? error.response.data : "Erreur lors de la connexion";
  }
};

export const getWeeklyReservations = async () => {
  try {
    console.log("Fetching weekly reservations...");
    const response = await fetch(`${apiUrl}/weekly-reservations`); 
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error('Error fetching weekly reservations');
    }
    const data = await response.json();
    console.log("Weekly Reservations Data:", data);
    return data; // Return the data to be used in the chart
  } catch (error) {
    console.error("Error fetching weekly reservations:", error);
    throw error;
  }
};
  
  
  
  
  
  