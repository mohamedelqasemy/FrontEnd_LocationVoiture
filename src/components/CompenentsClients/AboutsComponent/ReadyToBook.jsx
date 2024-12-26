/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReadyToBook = () => {
  const navigate=useNavigate();

  return (
    <Box sx={{ textAlign: "center", marginTop: 6 }}>
      <Typography variant="h4" gutterBottom>
        Prêt à Réserver ?
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ maxWidth: "600px", margin: "auto", marginBottom: 3 }}
      >
        Découvrez notre flotte de véhicules et profitez de nos offres spéciales pour vos trajets !
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="primary" size="large" onClick={()=>navigate("/cars")}>
          Découvrir nos véhicules
        </Button>
        <Button variant="outlined" color="secondary" size="large" onClick={()=>navigate("/bookings")}>
          En savoir plus
        </Button>
      </Box>
    </Box>
  );
};

export default ReadyToBook;
