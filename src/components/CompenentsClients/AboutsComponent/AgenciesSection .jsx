/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

const agencies = [
  { city: "Agadir", address: "10 Rue de Rivoli, Agadir" },
  { city: "Laayon", address: "15 Place Bellecour, Laayon" },
  { city: "Marrakech", address: "20 Quai du Port, Marrakech" },
  { city: "Tanger", address: "5 Rue Sainte-Catherine, Tanger" },
];

const AgenciesSection = () => {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom sx={{color:"orangered"}}>
        Nos Agences
      </Typography>
      <Grid container spacing={4}>
        {agencies.map((agency, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <Avatar sx={{ margin: "auto", bgcolor: "primary.main", mb: 2 }}>
                  <MapIcon />
                </Avatar>
                <Typography variant="h6">{agency.city}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {agency.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AgenciesSection;
