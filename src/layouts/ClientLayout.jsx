/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import ClientAppBar from "../components/CompenentsClients/ClientAppBar";
import Footer from "../components/CompenentsClients/Footer";
import { useEffect, useState } from "react";

const ClientLayout = () => {
  const [isAuth,setIsAuth]=useState(false);
  const navigate=useNavigate();


  useEffect(() => {
    // Vérifiez si un token est présent au chargement de la page
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  //fonction pour changer etat de authentification et stoker token
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token); // Stockez le token localement
    setIsAuth(true); // Mettez à jour l'état d'authentification
    navigate('/'); // Rediriger après le login
  };

  //fonction pour changer etat de authentification et supprimer token
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimez le token
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsAuth(false); // Réinitialisez l'état d'authentification
    navigate('/login'); // Rediriger vers la page de login
  };

  return (
    <div>

      {/* TopBar */}
      <ClientAppBar
        isLoggedIn={isAuth}
        onLogin={() => navigate("login")}
        onSignUp={() => navigate("register")}
        onLogout={handleLogout}
      />

      {/* Main Contenent */}
      <main style={{ paddingTop: '70px' }}>
        <Outlet context={{ handleLoginSuccess }}/>
      </main>


    {/* Footer */}
    <Footer/>
    </div>
  );
};

export default ClientLayout;
