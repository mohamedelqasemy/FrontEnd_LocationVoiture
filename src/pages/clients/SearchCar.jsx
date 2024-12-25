import React, { useState } from 'react';
import CarFilter from '../../components/CompenentsClients/ComponetsCar/CarFilter';
import CarCards from '../../components/CompenentsClients/ComponetsCar/CarCards';

export default function SearchCar() {
  const [filters, setFilters] = useState({
    model: '',
    series: '',
    minPrice: 0,
    maxPrice: 1000,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1>Search Car</h1>
      <div style={{ marginRight: 40 , marginLeft :40}}>
      <CarFilter onFilter={handleFilterChange} />
      </div>
      
      <CarCards filters={filters} />
    </div>
  );
}
