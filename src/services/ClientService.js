import axios from 'axios';

const apiUrl = 'http://localhost:8000/api'; // URL de votre API

// Fonction pour l'authentification (login)
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, credentials);
    return response.data; // Contient probablement le jeton d'authentification
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de la connexion';
  }
};

// Fonction pour l'enregistrement
export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Pour envoyer des fichiers
      },
    });
    return response.data; // Données de l'utilisateur ou message de succès
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur lors de l\'inscription';
  }
};



