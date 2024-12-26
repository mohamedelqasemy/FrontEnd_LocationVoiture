/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const teamMembers = [
  { name: "EL-Qasemy Mohamed", role: "Directrice Générale", image: "https://via.placeholder.com/150" },
  { name: "Ouahab Achraf", role: "Responsable Commercial", image: "https://via.placeholder.com/150" },
  { name: "Karym Otman", role: "Service Client", image: "https://via.placeholder.com/150" },
];

const TeamSection = () => {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="h4" gutterBottom sx={{color:"orangered"}}>
        Notre Équipe
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ textAlign: "center", height: "100%" }}>
              <CardContent>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ margin: "auto", width: 64, height: 64, mb: 2 }}
                >
                  {!member.image && <PeopleIcon />}
                </Avatar>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSection;
