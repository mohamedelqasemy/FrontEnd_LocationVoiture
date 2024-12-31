
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Button} from "@mui/material";
import CarBrandGrid from "../../components/CompenentsClients/AboutsComponent/CarBrandGrid";
import TeamSection from "../../components/CompenentsClients/AboutsComponent/TeamSection";
import AgenciesSection from "../../components/CompenentsClients/AboutsComponent/AgenciesSection ";
import CustomerReviews from './../../components/CompenentsClients/AboutsComponent/CustomerReviews';
import ReadyToBook from "../../components/CompenentsClients/AboutsComponent/ReadyToBook";

const Abouts = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "none" }}>
      {/* Introduction Section */}
      <Box sx={{ textAlign: "center", marginBottom: 6 }}>
        <Typography variant="h3" gutterBottom sx={{color:"#c8ad05"}}>
          À Propos de Nous
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: "700px", margin: "auto" }}>
          Nous sommes passionnés par la mobilité et la satisfaction de nos clients. Depuis plus une décennie, nous offrons des solutions de
          location de voitures flexibles, abordables, et adaptées à tous les besoins.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: "800px", margin: "auto", marginBottom: 3 }}>
          Fondée en 2010 avec une petite flotte de voitures, notre entreprise est développée pour devenir une des principales
          sociétés de location dans la région. Grâce à une approche centrée sur le client, nous avons étendu nos services à plusieurs
          villes et collaborons avec des marques renommées pour offrir des expériences inégalées.
        </Typography>
      </Box>

      {/* Villes et Agences */}
      <Box sx={{ marginBottom: 6 }}>
        <AgenciesSection/>
      </Box>

      {/* Marques et Sponsors */}
      <Box sx={{ marginBottom: 6 }}>
        <CarBrandGrid/>
      </Box>

      {/* Notre Équipe */}
      <Box sx={{ marginBottom: 6 }}>
        <TeamSection/>
      </Box>

      {/* Avis Clients */}
      <Box sx={{ marginBottom: 6 }}>
        <CustomerReviews/>
      </Box>

      {/* CTA Section */}
      <ReadyToBook/>

    </Box>
  );
};

export default Abouts;
