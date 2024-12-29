import React from 'react'
import SearchBar from '../../components/CompenentsClients/ComponentsMyReservation/SearchBar'
import ReservationCard from '../../components/CompenentsClients/ComponentsMyReservation/ReservationCard'
import { useEffect, useState , useRef  } from 'react';
import { getReservations, getCarById,deleteReservation } from '../../services/ClientService';
import ContactUs from '../../components/CompenentsClients/ComponentCoontactUs/ContactUs';
export default function MyReservation() {
  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const contactUsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'utilisateur connecté depuis le localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const userId = userInfo?.id;
  
        if (!userId) {
          console.error('Aucun utilisateur connecté.');
          return;
        }
  
        const reservationsData = await getReservations(userId);
  
        // Récupérer les informations de chaque voiture associée
        const carsData = {};
        for (const reservation of reservationsData) {
          if (!carsData[reservation.car_id]) {
            const carData = await getCarById(reservation.car_id);
            carsData[reservation.car_id] = carData;
          }
        }
  
        setReservations(reservationsData);
        setFilteredReservations(reservationsData); // Initialement, toutes les réservations sont affichées
        setCars(carsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (reservationId, dateStart) => {
    // Demander une confirmation à l'utilisateur
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
    if (!confirmation) {
      return; // L'utilisateur a annulé la suppression
    }
  
    // Vérifier si la date de début de réservation est après 2 jours au minimum
    const currentDate = new Date();
    const startDate = new Date(dateStart);
    const timeDifference = startDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    if (daysDifference < 2) {
      alert("Vous ne pouvez supprimer une réservation qu'au moins 2 jours avant la date de début.");
      return;
    }
  
    // Supprimer la réservation via l'API
    try {
      await deleteReservation(reservationId);
      alert('Réservation supprimée avec succès.');
  
      // Mettre à jour l'état local après la suppression
      const updatedReservations = reservations.filter((r) => r.id !== reservationId);
      setReservations(updatedReservations);
      setFilteredReservations(updatedReservations);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Impossible de supprimer la réservation.');
    }
  };
  

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredReservations(reservations);
      return;
    }

    const filtered = reservations.filter((reservation) => {
      const car = cars[reservation.car_id];
      return car && car.marque.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredReservations(filtered);
  };

  const handleContactSubmit = (formData) => {
    console.log('Formulaire envoyé :', formData);
    // Vous pouvez effectuer un appel API ici pour envoyer les données.
  };

  const handleContactClick = () => {
    if (contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div>
      <h1>Mes Réservations</h1>
      <SearchBar onSearch={handleSearch} />
      <br />
      <div style={{ padding: 20 }}>
        {filteredReservations.map((reservation) => {
          const car = cars[reservation.car_id];
          return (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              car={car}
              onCancel={() => handleDelete(reservation.id, reservation.date_start)}
              onContact={handleContactClick}
            />
          );
        })}
      </div>

      <h1 ref={contactUsRef}>Contact Us</h1>
      <div style={{ padding: 20 }}>
        <ContactUs onSubmit={handleContactSubmit} />
      </div>
    </div>
  );
}