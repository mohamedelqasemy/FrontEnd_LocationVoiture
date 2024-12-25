import React, { useState } from 'react';
import { Box, Grid, TextField, Slider, Button } from '@mui/material';

const CarFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    marque: '', // Remplace "model" par "marque"
    series: '', // Série peut être tapée
    minPrice: 0,
    maxPrice: 1000,
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSliderChange = (_, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {/* Marque Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Marque"
            variant="outlined"
            fullWidth
            value={filters.marque}
            onChange={handleChange('marque')}
          />
        </Grid>

        {/* Série Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Série"
            variant="outlined"
            fullWidth
            value={filters.series}
            onChange={handleChange('series')}
          />
        </Grid>

        {/* Price Range Filter */}
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ paddingX: '8px' }}>
            <label>Prix (en MAD)</label>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
          </Box>
        </Grid>

        {/* Apply Filters */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilters}
          >
            Appliquer les filtres
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarFilter;
