import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { getCars } from '../../../services/ClientService'; // Assurez-vous que le chemin est correct
import { useCarContext } from '../../CarContext';
import { useNavigate } from 'react-router-dom';

const CarCards = ({ filters }) => {
  const { setSelectedCar } = useCarContext();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const imageUrl = 'http://localhost:8000/storage/';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carData = await getCars();
        setCars(carData);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const applyFilters = () => {
    return cars.filter((car) => {
      const matchesMarque = filters.marque
        ? car.marque?.toLowerCase().includes(filters.marque.toLowerCase())
        : true;
  
      const matchesSeries = filters.series
        ? car.date_serie?.toString() === filters.series
        : true;
  
      const matchesPrice = car.prix >= filters.minPrice && car.prix <= filters.maxPrice;
  
      return matchesMarque && matchesSeries && matchesPrice;
    });
  };
  
  const handleReserve = (car) => {
    setSelectedCar(car);
    console.log(car); // Save the selected car in context
    navigate("/bookings"); // Navigate to the booking page
  };
  
  

  const filteredCars = applyFilters();

  if (loading) {
    return <Typography>Chargement des données...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%', padding: '16px' }}>
      <Grid container spacing={4}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 3, height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${imageUrl+car.image}`}
                  alt={`${car.marque} ${car.model}`}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h6" component="div">
                    {car.marque} {car.model}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {car.prix} MAD / jour
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginY: 1 }}>
                    Année : {car.date_serie}
                  </Typography>
                  <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3, // Limite à 3 lignes
                            textOverflow: 'ellipsis',
                            marginBottom: 2,
                            height: '4.5em', // Hauteur fixe pour 3 lignes (chaque ligne ~1.5em)
                        }}
                        >
                        {car.description}
                    </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ marginBottom: '0px' }}
                    onClick={() => handleReserve(car)}
                    >
                    Réserver maintenant
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Aucune voiture ne correspond aux critères de recherche.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CarCards;
