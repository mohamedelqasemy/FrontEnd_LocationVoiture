import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, Typography, Divider, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCarContext } from "../../CarContext";
import { useDateContext } from "../../DateContext";

const ReservationDetails = forwardRef((props, ref) => {
  const { selectedCar } = useCarContext();
  const { selectedDate, setSelectedDate } = useDateContext();
  let userInfo = {}
  if (localStorage.getItem("userInfo")) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);}
  const [formData, setFormData] = useState({
    nom: userInfo.nom||"",
    prenom: userInfo.prenom||"",
    numTel: userInfo.numtel||"",
    date_start:selectedDate?.start || null,
    date_end:selectedDate?.end || null
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (newDate) => {
    setSelectedDate((prev) => ({ ...prev, start: newDate }));
    setFormData((prev) => ({ ...prev, date_start: newDate }));
  };

  const handleEndDateChange = (newDate) => {
    setSelectedDate((prev) => ({ ...prev, end: newDate }));
    setFormData((prev) => ({ ...prev,  date_end: newDate }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Nom est requis.";
    if (!formData.prenom.trim()) newErrors.prenom = "Prénom est requis.";
    if (!formData.numTel.trim()) newErrors.numTel = "Numéro de téléphone est requis.";
    if (!selectedDate?.start) newErrors.startDate = "Date de début est requise.";
    if (!selectedDate?.end) newErrors.endDate = "Date de fin est requise.";
    if (!selectedCar) newErrors.selectedCar = "Aucune voiture sélectionnée.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateForm,formData,setFormData
  }));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Détails de la réservation
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <TextField
          label="Nom"
          name="nom"
          fullWidth
          margin="normal"
          value={formData.nom}
          onChange={handleInputChange}
          error={!!errors.nom}
          helperText={errors.nom}
        />
        <TextField
          label="Prénom"
          name="prenom"
          fullWidth
          margin="normal"
          value={formData.prenom}
          onChange={handleInputChange}
          error={!!errors.prenom}
          helperText={errors.prenom}
        />
        <TextField
          label="Numéro de téléphone"
          name="numTel"
          fullWidth
          margin="normal"
          value={formData.numTel}
          onChange={handleInputChange}
          error={!!errors.numTel}
          helperText={errors.numTel}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date de début"
            value={selectedDate?.start || null}
            onChange={handleStartDateChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                error: !!errors.startDate,
                helperText: errors.startDate,
              },
            }}
          />
          <DatePicker
            label="Date de fin"
            value={selectedDate?.end || null}
            onChange={handleEndDateChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                error: !!errors.endDate,
                helperText: errors.endDate,
              },
            }}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
});

export default ReservationDetails;
