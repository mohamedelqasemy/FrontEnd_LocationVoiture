/* eslint-disable no-unused-vars */
import React from "react";
import "./styler.css";

const carData = [
  { id: 1, name: "BMW Série 3", image: "/Images/bmw.jpg" },
  { id: 2, name: "Audi Q8", image: "/Images/audi.jpg" },
  { id: 3, name: "Mercedes-Benz Classe C", image: "/Images/mercedes.jpg" },
  { id: 4, name: "Dacia Sandero", image: "/Images/dacia.jpg" },
];

const CarRentalCarousel = () => {
  return (
    <div className="carousel">
      <div className="carousel-track">
        {carData.map((car) => (
          <div key={car.id} className="carousel-slide">
            <img src={car.image} alt={car.name} />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {carData.map((_, index) => (
          <div key={index} className="carousel-dot"></div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalCarousel;
