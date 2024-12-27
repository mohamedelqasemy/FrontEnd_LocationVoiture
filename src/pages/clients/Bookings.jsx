import React, { useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ReservationSummary from "../../components/CompenentsClients/BookingComponent/ReservationSummary";
import ReservationDetails from "../../components/CompenentsClients/BookingComponent/ReservationDetails";
import ActionButtons from "../../components/CompenentsClients/BookingComponent/ActionButtons";
import { useCarContext } from "../../components/CarContext";
import { useDateContext } from "../../components/DateContext";
import { addReservation } from "../../services/ClientService";
import dayjs from "dayjs";
import Notification from './../../components/CompenentsClients/notificationsComponent/Notification';

const Bookings = () => {
  const reservationDetailsRef = useRef();
  const DateRef = useRef();
  const { selectedCar, setSelectedCar } = useCarContext();
    const { selectedDate, setSelectedDate } = useDateContext();

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleConfirm = () => {
    if (reservationDetailsRef.current?.validateForm()) {
      const nbr = DateRef.current?.nbr_jours;
      const selectedCar = DateRef.current?.selectedCar;

      if (!nbr || !selectedCar?.prix) {
        showNotification("Les informations nécessaires sont manquantes.", "error");
        return;
      }

      if (localStorage.getItem("userInfo")) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const newReservation = {
          total_prix: nbr * selectedCar.prix,
          date_start: dayjs(reservationDetailsRef.current.formData.date_start).format("YYYY-MM-DD"),
          date_end: dayjs(reservationDetailsRef.current.formData.date_end).format("YYYY-MM-DD"),
          client_id: userInfo?.id,
          car_id: selectedCar.id,
        };

        addReservation(newReservation)
          .then(() => {
            showNotification("Réservation ajoutée avec succès.", "success");
            
          })
          .catch(() => {
            showNotification("Erreur lors de l'ajout de la réservation.", "error");
          });
      } else {
        showNotification("Veuillez vous connecter pour réserver une voiture.", "error");
      }
    } else {
      showNotification("Validation échouée. Corrigez les erreurs.", "error");
    }
  };

  const handleCancel = () => {
    // Réinitialiser les champs et la voiture sélectionnée après la réservation
    reservationDetailsRef.current.setFormData({
      nom: "",
      prenom: "",
      numTel: "",
      date_start: null,
      date_end: null,
    });
    setSelectedCar(null); // Désélectionner la voiture
    setSelectedDate({ start: null, end: null }); // Réinitialiser les dates
    showNotification("Réservation annulée.", "success");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Résumé de la réservation
      </Typography>
      <Grid container spacing={3}>
        {/* Left Section: User Inputs */}
        <Grid item xs={12} md={6}>
          <ReservationDetails ref={reservationDetailsRef} />
        </Grid>

        {/* Right Section: Summary */}
        <Grid item xs={12} md={6}>
          <ReservationSummary ref={DateRef} />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <ActionButtons onConfirm={handleConfirm} onCancel={handleCancel} />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </Box>
  );
};

export default Bookings;
