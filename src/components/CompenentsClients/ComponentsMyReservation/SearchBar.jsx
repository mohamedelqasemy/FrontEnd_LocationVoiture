import React from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
        padding: '16px',
        boxShadow: 3,
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Champ de saisie */}
        <Grid item xs={9}>
          <TextField
            fullWidth
            variant="outlined"
            label="Rechercher"
            placeholder="Entrez un mot clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        {/* Bouton de recherche */}
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Rechercher
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
