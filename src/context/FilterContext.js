import React, { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter se mora koristiti unutar FilterContext");
  }
  return context;
}

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    makes: [],
    models: [],
    selectedMake: null,
    selectedModel: null,
    filteredMakes: [],
    fuelTypes: [],
    selectedFuelType: null,
    wheelTypes: [],
    selectedWheelType: null,
  });

  const handleSearch = () => {};

  return (
    <FilterContext.Provider value={{ filter, setFilter, handleSearch }}>
      {children}
    </FilterContext.Provider>
  );
};
