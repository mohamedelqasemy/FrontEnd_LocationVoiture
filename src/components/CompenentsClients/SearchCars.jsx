import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Box } from '@mui/material';
import { useDateContext } from '../DateContext';
import { useNavigate } from 'react-router-dom';

function SearchCars() {
  const { setSelectedDate } = useDateContext();
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleSearch = () => {
    //alert(`Recherche des voitures disponibles du ${startDate.format('DD/MM/YYYY')} au ${endDate.format('DD/MM/YYYY')}`);
    setSelectedDate ({start: startDate, end: endDate});
    navigate("/bookings"); // Navigate to the booking page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        margin: '0 auto',
      }}
    >
      <p>Sélectionnez vos dates</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date de début"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="Date de fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#1565c0' },
          padding: '10px 20px',
        }}
      >
        Rechercher
      </Button>
    </Box>
  );
}

export default SearchCars;
