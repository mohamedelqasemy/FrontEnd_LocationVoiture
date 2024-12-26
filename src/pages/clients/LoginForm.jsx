/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { login } from '../../services/ClientService';
import { useOutletContext } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const [numtel, setNumTel] = useState('');
  const [password, setPassword] = useState('');
  const { handleLoginSuccess } = useOutletContext(); // Récupérer depuis le contexte

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { numtel, password };
      const data = await login(credentials);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.client));
      handleLoginSuccess(data.token);
    } catch (error) {
      alert('Erreur de connexion');
    }
  };

  return (
      <Box
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          width: "400px",
          margin: "auto",
          marginTop: "12px",
          marginBottom: "12px",
          height: "350px",
          padding: 3,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography 
        sx={{
          fontFamily:"algerian",
            alignSelf:"center",
            color:"#bd1121",
            variant:"h2",
            component:"h2"
        }}
        >
          Login
        </Typography>
        <TextField
          label="Numéro de téléphone"
          type="text"
          value={numtel}
          onChange={(e) => setNumTel(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="warning"
          fullWidth
        >
          Login
        </Button>
      </Box>
  );
};

export default LoginForm;
