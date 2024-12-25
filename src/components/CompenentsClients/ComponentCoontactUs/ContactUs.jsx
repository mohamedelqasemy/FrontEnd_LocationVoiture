import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

const ContactUs = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form Submitted:', formData);
      alert('Merci de nous avoir contactés !');
    }

    // Réinitialiser le formulaire après soumission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Get in Touch
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Nom */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Your Name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label="Your Email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="message"
              label="Your Message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>

          {/* Bouton de soumission */}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactUs;
