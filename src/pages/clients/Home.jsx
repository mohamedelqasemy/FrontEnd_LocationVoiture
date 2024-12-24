import React from 'react';
import dayjs from 'dayjs';
import SearchCars from '../../components/CompenentsClients/SearchCars';

function Home() {
  const [pickupTime, setPickupTime] = React.useState(dayjs());
  const [returnTime, setReturnTime] = React.useState(dayjs());

  return (
    <div>
      {/* Header Section */}
      <div style={{ textAlign: 'center', padding: '50px 0', background: '#f5f5f5' }}>
        <h1>Bienvenue sur AZULCar</h1>
        <p>Trouvez, comparez et louez la voiture idéale pour vos besoins.</p>
      </div>

      {/* Search Cars */}
      <SearchCars />
      
      {/* Categories Section */}
      <div style={{ padding: '20px' }}>
        <h2>Nos Catégories</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {['SUV', 'Citadine', 'Berline', 'Cabriolet'].map((category) => (
            <div key={category} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={`https://via.placeholder.com/150?text=${category}`}
                alt={category}
                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <p>{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cars Section */}
      <div style={{ padding: '20px', background: '#e8f4fc' }}>
        <h2>Voitures populaires</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[
            { name: 'Toyota Corolla', price: '50€/jour' },
            { name: 'Renault Clio', price: '40€/jour' },
            { name: 'Ford Focus', price: '45€/jour' },
          ].map((car) => (
            <div key={car.name} style={{ margin: '10px', textAlign: 'center', width: '200px' }}>
              <img
                src={`https://via.placeholder.com/200?text=${car.name}`}
                alt={car.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <h4>{car.name}</h4>
              <p>{car.price}</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}

export default Home;
