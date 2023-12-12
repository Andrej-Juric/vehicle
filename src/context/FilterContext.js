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

  // const handleSearch = () => {
  //   let filteredItems = filter.models;

  //   if (filter.selectedMake) {
  //     filteredItems = filter.models.filter(
  //       (model) =>
  //         (!filter.selectedFuelType ||
  //           model.fuel_type === filter.fuelTypes[filter.selectedFuelType]) &&
  //         (!filter.selectedMake || model.makeId === filter.selectedMake) &&
  //         (!filter.selectedModel || model.id === filter.selectedModel) &&
  //         (!filter.selectedWheelType ||
  //           model.wheel_type === filter.wheelTypes[filter.selectedWheelType])
  //     );
  //   } else if (
  //     filter.models &&
  //     (filter.selectedFuelType || filter.selectedWheelType)
  //   ) {
  //     filteredItems = filter.models.filter(
  //       (model) =>
  //         (!filter.selectedFuelType ||
  //           model.fuel_type === filter.fuelTypes[filter.selectedFuelType]) &&
  //         (!filter.selectedWheelType ||
  //           model.wheel_type === filter.wheelTypes[filter.selectedWheelType])
  //     );
  //   } else {
  //     filteredItems = filter.makes;
  //   }

  //   setFilter((prevFilter) => ({
  //     ...prevFilter,
  //     filteredMakes: filteredItems,
  //   }));
  // };

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
