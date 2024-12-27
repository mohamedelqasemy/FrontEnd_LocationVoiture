import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, duration / 100);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 450,
        borderRadius: 0,  // Rendre les coins sans arrondi
        backgroundColor: type === "success" ? "green" : "red",
        color: "#fff",
        boxShadow: 3,
        zIndex: 1300,
      }}
    >
      {/* Contenu du message de notification */}
      <Box sx={
        { padding: 2, 
          marginRight :5
        }

    }>
        <Typography variant="body1">{message}</Typography>
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 12, right: 8, color: "#fff" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Barre de progression */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          marginBottom: 0,
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: type === "success" 
              ? "rgba(0, 128, 0, 0.6)"  // Vert clair pour le succès
              : "rgba(255, 0, 0, 0.6)", // Rouge clair pour l'erreur
          },
        }}
      />
    </Box>

  );
};

export default Notification;
