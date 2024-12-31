import React, { useState } from 'react';
import './CarCard.css';

export default function CarCard({ marque, model, image, prix }) {
  const [dropdownVisivility, setVisibility] = useState(false);

  return (
    <div className='cardContainer' onMouseLeave={() => setVisibility(false)}>
      <h5>{marque}</h5>
      <img src={image} alt={`${marque} ${model}`} />
      <div className="description">
        <span>Modele : {model}</span>
        <span>Carburant : Essence</span>
      </div>
      <div className="prix">
        <h5>{prix} dhs</h5>
        <span>/par jour</span>
      </div>
      <div className="dots" onClick={() => setVisibility(true)}>
        <span>⋮</span>
      </div>
      {dropdownVisivility && (
        <div className="dropdown">
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
}
