import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';

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



