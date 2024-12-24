import React, { useState } from 'react';
import { register } from './ClientService'; // Assurez-vous d'importer la fonction de service
import { useNavigate } from 'react-router-dom'; // Pour rediriger après l'inscription

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numtel, setNumtel] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook pour rediriger après l'inscription

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créez un objet avec les données du formulaire
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('numtel', numtel);
    if (image) {
      formData.append('image', image);
    }

    try {
      const data = await register(formData); // Utilisation de la fonction de service
      navigate('/login'); // Rediriger vers la page de login après inscription
    } catch (error) {
      setError(error.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Afficher les erreurs */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            value={numtel}
            onChange={(e) => setNumtel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image de profil :</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
