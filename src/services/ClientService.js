import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';


// Fonction pour récupérer les réservations
export const getReservations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reservations`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la récupération des réservations';
  }
};

// Fonction pour supprimer une réservation
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${apiUrl}/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la suppression de la réservation';
  }
};

// Fonction pour récupérer les informations d'une voiture par son ID
export const getCarById = async (carId) => {
  try {
    const response = await axios.get(`${apiUrl}/cars/${carId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la récupération des données de la voiture';
  }
};


// Fonction pour récupérer la liste des voitures
export const getCars = async () => {
  try {
    const response = await axios.get(`${apiUrl}/cars`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la récupération des voitures';
  }
};

// Fonction pour l'authentification (login)
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/clients/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la connexion';
  }
};

// Fonction pour l'enregistrement
export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/clients`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de l\'inscription';
  }
};



