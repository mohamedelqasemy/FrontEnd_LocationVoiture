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