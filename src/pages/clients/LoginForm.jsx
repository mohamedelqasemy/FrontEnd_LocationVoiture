/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { login } from '../../services/ClientService';
import { useOutletContext } from 'react-router-dom';

const LoginForm = () => {
  const [numtel, setNumTel] = useState('');
  const [password, setPassword] = useState('');
  const { handleLoginSuccess } = useOutletContext(); // Récupérer depuis le contexte

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { numtel, password };
      const data = await login(credentials);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.client));
      handleLoginSuccess(data.token);
    } catch (error) {
      alert('Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={numtel}
        onChange={(e) => setNumTel(e.target.value)}
        placeholder="Numéro de téléphone"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
