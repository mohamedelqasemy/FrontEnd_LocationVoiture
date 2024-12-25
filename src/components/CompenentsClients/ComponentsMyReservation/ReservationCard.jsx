import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const ReservationCard = ({ reservation, car, onCancel, onContact }) => {
  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      {/* Image de la voiture */}
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={`${car.image}`}
        alt={`${car.marque} ${car.model}`}
      />

      {/* Contenu de la réservation */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {`${car.marque} ${car.model}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Réservation #{reservation.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Période: {reservation.date_start} au {reservation.date_end}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Client ID: {reservation.client_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {reservation.total_prix} MAD
          </Typography>
        </CardContent>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
          <Button variant="contained" color="error" onClick={onCancel}>
            Annuler la réservation
          </Button>
          <Button variant="outlined" color="primary" onClick={onContact}>
            Contacter le propriétaire
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ReservationCard;
