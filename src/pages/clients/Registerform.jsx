/* eslint-disable no-unused-vars */
import { useState } from "react";
import { register } from "../../services/ClientService";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const Registerform = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [numtel, setNumtel] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name; // Nom unique
    const filePath = `${fileName}`; // Chemin logique
    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imagePath = null;
    if (image) {
      imagePath = handleFileUpload(image);
    }

    const formData = {
      nom,
      prenom,
      password,
      numtel,
      image: imagePath, // Chemin envoyé au backend
    };

    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      setError(error.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <>
      <Box
        sx={{
          display:"flex",
          flexDirection:"column",
          width: "400px",
          margin: "auto",
          marginTop: "3px",
          marginBottom:"12px",
          padding: 4,
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
          Register
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Prénom"
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Numéro de téléphone"
            type="text"
            value={numtel}
            onChange={(e) => setNumtel(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
          
          <Button type="submit" variant="contained" color="warning" fullWidth>
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Registerform;
