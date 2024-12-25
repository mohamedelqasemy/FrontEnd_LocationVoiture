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

// fonction pour modifier les donnes de client
export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axios.put(`${apiUrl}/clients/${clientId}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

export const uploadProfileImage = async (clientId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("image", imageFile);

    const response = await axios.post(`${apiUrl}/clients/upload-profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

export const changePassword = async (clientId, passwords) => {
  try {
    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("old_password", passwords.oldPassword);
    formData.append("new_password", passwords.newPassword);

    console.log(formData);
    const response = await axios.post(`${apiUrl}/clients/update-password`, formData);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};