import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardContent, Typography, Divider, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCarContext } from "../../CarContext";
import { useDateContext } from "../../DateContext";

const ReservationSummary = forwardRef((props, ref) => {
  const { selectedCar } = useCarContext();
  const navigate = useNavigate();
  const [nbr_jours,setNbrJours] = useState(0);
  const { selectedDate, setSelectedDate } = useDateContext();


  useEffect(() => {
    if (selectedDate?.start && selectedDate?.end) {
      const startDate = new Date(selectedDate.start);
      const endDate = new Date(selectedDate.end);

      if (!isNaN(startDate) && !isNaN(endDate)) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNbrJours(diffDays);
      }
    }
  }, [selectedDate]);
  useImperativeHandle(ref, () => ({
      nbr_jours,selectedCar
    }));

  // Redirect to search page
  const handleRedirect = () => {
    navigate("/cars");
  };

  if (!selectedCar) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" color="textSecondary">
          Aucune voiture sélectionnée.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Sélectionner une voiture
        </Button>
      </Box>
    );
  }
  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Résumé de la réservation
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <img src={selectedCar.image} alt={`${selectedCar.marque} ${selectedCar.model}`} width={470} />
        <Typography>
          <strong>Marque:</strong> {selectedCar.marque}
        </Typography>
        <Typography>
          <strong>Modèle:</strong> {selectedCar.model}
        </Typography>
        <Typography>
          <strong>Année:</strong> {selectedCar.date_serie}
        </Typography>
        <Typography>
          <strong>Prix:</strong> {selectedCar.prix} MAD / jour
        </Typography>
        <Typography>
          <strong>Prix Totale:</strong> {selectedCar.prix*nbr_jours} MAD pour {nbr_jours} jours
        </Typography>
        
        
      </CardContent>
    </Card>
  );
});

export default ReservationSummary;
