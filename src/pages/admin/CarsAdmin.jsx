/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CarCard from '../../components/ComponentsAdmin/Voiture/CarCard';
import './CarsAdmin.css';
import { getCars } from '../../services/AdminService';
import Form from '../../components/ComponentsAdmin/NewCarForm/Form';

export default function CarsAdmin() {
  const [cars, setCars] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // For loading feedback
  const [error, setError] = useState(null); // For error handling
  const [search,setSearch]=useState("")
  const [allCars, setAllCars] = useState([]); 
  const [showForm, setShowForm] = useState(false); // State to show/hide the form

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setAllCars(data)

        setCars(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des voitures:', error);
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCars();
  }, []);

  function onSearch(e) {
    
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue); 
   if(searchValue.trim() !== ""){
     
      setCars(allCars.filter(car => car.marque.toLowerCase().includes(searchValue)));
      console.log(cars);
      
   }
   else{
    setCars(allCars)
    console.log("dkhl l khawa");
    
    
   }
    console.log("khs ytbdlo");
    
  }

  const handleAddCarClick = () => {
    setShowForm(true); // Show the form (trigger the modal)
  };

  const closeForm = () => {
    setShowForm(false); // Close the form (hide the modal)
  };
  return (
    <>
      <div className="addcar">
      <button onClick={handleAddCarClick}>Add a Car</button>
      </div>
      <div className="searchdiv">
       <input type="text" onChange={(e)=>onSearch(e)} value={search} />
     
      </div>
      <div className="CarsAdminContainer">
        {loading ? (
          <p>Loading...</p> // Show loading message
        ) : error ? (
          <p>{error}</p> // Show error message
        ) : cars.length === 0 ? (
          <p>No cars available.</p> // Handle empty car list
        ) : (
          cars.map(car => (
            <CarCard
              key={car.id}
              id={car.id}
              marque={car.marque}
              model={car.model}
              image={car.image}
              prix={car.prix}
              description={car.description}
              
            />
          )
        )

        )}
      </div>
      {/* Render the Form modal */}
      {showForm && <Form onClose={closeForm} />}
    </>
  );
}
