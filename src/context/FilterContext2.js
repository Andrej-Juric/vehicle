import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState({
    selectedMake: null,
    selectedModel: null,
    selectedFuelType: null,
    selectedWheelType: null,
  });

  const setFilter = (filter) => {
    setFilterState((prevFilterState) => ({ ...prevFilterState, ...filter }));
  };

  return (
    <FilterContext.Provider value={{ filterState, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
