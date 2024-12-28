/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getCars } from '../../services/ClientService'; // Importer la fonction pour récupérer les voitures
import SearchCars from './../../components/CompenentsClients/SearchCars';

// Importation des images locales pour les logos
import bmwLogo from '../../assets/images/logo_bmw.png';
import renaultLogo from '../../assets/images/logo_renault.png';
import mercedesLogo from '../../assets/images/logo_mercedes.png';
import audiLogo from '../../assets/images/logo_audi.png';
import CarRentalCarousel from '../../components/CompenentsClients/CarouselComponent/CarRentalCarousel';


function Home() {
  const [pickupTime, setPickupTime] = React.useState(dayjs());
  const [returnTime, setReturnTime] = React.useState(dayjs());
  const [cars, setCars] = useState([]); // Etat pour stocker les voitures récupérées

  // Utilisation de useEffect pour récupérer les voitures au chargement du composant
  useEffect(() => {
    // Fonction pour récupérer les voitures
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data); // Mettre à jour l'état avec les voitures récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération des voitures:', error);
      }
    };
    fetchCars();
  }, []); // La fonction fetchCars sera appelée une seule fois au chargement du composant

  return (
    <div>
      {/* Header Section */}
      <div style={{ textAlign: 'center', padding: '50px 0', background: '#f5f5f5' }}>
        <h1>Bienvenue sur AZULCar</h1>
        <p>Trouvez, comparez et louez la voiture idéale pour vos besoins.</p>
      </div>

      <CarRentalCarousel/>

      {/* Search Cars */}
      <SearchCars />
      
      {/* Categories Section */}
      <div style={{ padding: '20px' }}>
        <h2>Nos Marques</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[
            { category: 'SUV', model: 'BMW X5', logo: bmwLogo },
            { category: 'Citadine', model: 'Renault Clio', logo: renaultLogo },
            { category: 'Berline', model: 'Mercedes-Benz C-Class', logo: mercedesLogo },
            { category: 'Cabriolet', model: 'Audi A5 Cabriolet', logo: audiLogo }
          ].map((item) => (
            <div key={item.category} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={item.logo} // Logo de la voiture
                alt={item.category}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
              />
              <p>{item.category}</p>
              <h4>{item.model}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cars Section */}
      <div style={{ padding: '20px', background: '#e8f4fc' }}>
        <h2>Voitures populaires</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {cars.slice(0, 3).map((car) => (
            <div
              key={car.id}
              className="car-item" // Ajout de la classe CSS pour chaque voiture
              style={{
                margin: '10px',
                textAlign: 'center',
                width: '200px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Ajout de la transition pour l'animation
              }}
            >
              <div
                style={{
                  overflow: 'hidden', // Empêche l'agrandissement de dépasser les bords
                  borderRadius: '10px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transition de la voiture
                }}
              >
                <img
                  src={car.image || require('../../assets/default_car.png').default} // Utilisez une image par défaut en local
                  alt={car.model}
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '10px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transition pour l'effet hover sur l'image
                  }}
                />
              </div>
              <h4>{car.marque} {car.model}</h4>
              <p>{car.prix}€/jour</p>
            </div>
          ))}
        </div>
      </div>

      {/* Style hover avec CSS en ligne */}
      <style>
        {`
          .car-item:hover {
            transform: scale(1.05); /* Agrandissement de l'élément lors du survol */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Ombre portée lors du survol */
          }
        `}
      </style>
    </div>
  );
}

export default Home;
