/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  { name: "Jean Dupont", review: "Service excellent, voitures en parfait état.", rating: 5 },
  { name: "Marie Curie", review: "Facile à réserver, staff très accueillant.", rating: 4.5 },
  { name: "Paul Valéry", review: "Bon rapport qualité-prix. Très satisfait.", rating: 5 },
];

const CustomerReviews = () => {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom sx={{color:"orangered"}}>
        Avis des Clients
      </Typography>
      <Grid container spacing={4}>
        {reviews.map((client, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {client.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {client.review}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {Array.from({ length: Math.floor(client.rating) }, (_, i) => (
                    <StarIcon key={i} sx={{ color: "#FFD700" }} />
                  ))}
                  {client.rating % 1 !== 0 && (
                    <StarIcon sx={{ color: "#FFD700", opacity: 0.5 }} />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerReviews;
