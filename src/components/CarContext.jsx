import React, { createContext, useContext, useState } from "react";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);

