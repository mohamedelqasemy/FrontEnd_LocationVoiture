/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar } from "@mui/material";
import Link from "@mui/material/Link";

const carBrands = [
  { name: "Tesla", image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", website: "https://www.tesla.com/" },
  { name: "BMW", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", website: "https://www.bmw.com/" },
  { name: "Renault", image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Renault_2021_logo.svg", website: "https://www.renault.com/" },
  { name: "Toyota", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.svg", website: "https://www.toyota.com/" },
  { name: "Mercedes", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", website: "https://www.mercedes-benz.com/" },
  { name: "Audi", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Audi_logo_2023.svg", website: "https://www.audi.com/" },
  { name: "Dacia", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Dacia_logo.svg", website: "https://www.dacia.fr/" },
  { name: "Skoda", image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Skoda_logo_2021.svg", website: "https://www.skoda-auto.com/" },
];

const CarBrandGrid = () => {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom sx={{color:"orangered"}}>
        Marques Partenaires
      </Typography>
      <Grid container spacing={4}>
        {carBrands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={brand.name}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <Avatar
                  src={brand.image}
                  alt={brand.name}
                  sx={{ margin: "auto", width: 64, height: 64, mb: 2 }}
                />
                <Typography variant="h6">{brand.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Voitures fiables et modernes pour chaque trajet.
                </Typography>
                <Link
                  href={brand.website}
                  target="_blank"
                  rel="noopener"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Visitez le site officiel
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarBrandGrid;
