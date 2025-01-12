import { useState } from 'react';
import { adminlogin } from '../../../services/AdminService'; 
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
  const [numtel, setnumtel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Ajout d'un état pour l'erreur
  const navigate = useNavigate();
  const credentials = { numtel, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialisation de l'erreur à chaque soumission
    try {
      const response = await adminlogin(credentials);
    
      if (response) {
        // Stockage du token et des informations admin dans le localStorage
        localStorage.setItem('admin', JSON.stringify(response.admin));
        localStorage.setItem('token', response.token); // Stockage du token aussi
    
        // Redirection vers le tableau de bord
        navigate('/dashboard'); 
      } else {
        // Affichage du message d'erreur en cas d'identifiants incorrects
        setError('Identifiants incorrects');
      }
    } catch (error) {
      console.error("Login failed", error);
      // Affichage d'un message d'erreur détaillé
      setError(error.response?.data?.message || 'Erreur de connexion');
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
        alignItems: "center",
        gap: 2,
        width: "400px",
        height: "400px",
        margin: "auto",
        padding: 3,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        backgroundColor: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        sx={{
          fontFamily: "algerian",
          alignSelf: "center",
          color: "#bd1121",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Login
      </Typography>
      <TextField
        label="Num de telephone"
        type="text"
        value={numtel}
        onChange={(e) => setnumtel(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
      />
      {error && (
        <Typography sx={{ color: 'red', fontSize: '14px', marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="warning"
        fullWidth
      >
        Se connecter
      </Button>
    </Box>
  );
};

export default Login;
