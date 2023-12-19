import React, { useContext, useEffect, useState } from "react";
import { FilterContext, useFilter } from "../../context/FilterContext";
import { Select, Button } from "@mantine/core";
import Link from "next/link";

export default function FilterBar({
  makes,
  models,
  fuelTypes,
  wheelTypes,
  filteredMakes,
}) {
  const { filter, setFilter } = useFilter();

  const [selectedMake, setSelectedMake] = useState(filter.selectedMake);
  const [selectedModel, setSelectedModel] = useState(filter.selectedModel);
  const [selectedFuelType, setSelectedFuelType] = useState(
    filter.selectedFuelType
  );
  const [selectedWheelType, setSelectedWheelType] = useState(
    filter.selectedWheelType
  );
  console.log(selectedMake);
  console.log(selectedModel);

  useEffect(() => {
    setSelectedMake(filter.selectedMake);
    setSelectedModel(filter.selectedModel);
    setSelectedFuelType(filter.selectedFuelType);
    setSelectedWheelType(filter.selectedWheelType);
  }, [filter]);

  const handleSearch = () => {
    let filteredItems = models;

    if (selectedMake) {
      filteredItems = models.filter(
        (model) =>
          (!selectedFuelType ||
            model.fuel_type === fuelTypes[selectedFuelType]) &&
          (!selectedMake || model.makeId === selectedMake) &&
          (!selectedModel || model.id === selectedModel) &&
          (!selectedWheelType ||
            model.wheel_type === wheelTypes[selectedWheelType])
      );
    } else if (models && (selectedFuelType || selectedWheelType)) {
      filteredItems = models.filter(
        (model) =>
          (!selectedFuelType ||
            model.fuel_type === fuelTypes[selectedFuelType]) &&
          (!selectedWheelType ||
            model.wheel_type === wheelTypes[selectedWheelType])
      );
    } else {
      filteredItems = makes;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      filteredMakes: filteredItems,
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [selectedMake, selectedModel, selectedFuelType, selectedWheelType]);

  return (
    <div>
      <Select
        label="Choose makes"
        placeholder="Pick car"
        data={makes.map((make) => ({ label: make.name, value: make.id }))}
        style={{ width: 200 }}
        value={selectedMake}
        onChange={setSelectedMake}
        clearable
        searchable
      />
      <Select
        label="Choose models"
        placeholder="Pick model"
        data={
          models &&
          selectedMake &&
          models
            .filter((model) => !selectedMake || model.makeId === selectedMake)
            .map((model) => ({
              label: model.name,
              value: model.id,
            }))
        }
        style={{ width: 200 }}
        value={selectedModel}
        onChange={(value) => setSelectedModel(value)}
        clearable
        searchable
      />
      <Select
        label="Engine/Fuel type"
        placeholder="Pick model"
        data={
          fuelTypes &&
          fuelTypes.map((model, index) => ({
            label: model,
            value: String(index),
          }))
        }
        style={{ width: 200 }}
        value={selectedFuelType}
        onChange={(value) => setSelectedFuelType(value)}
        clearable
        searchable
      />
      <Select
        label="Wheel type"
        placeholder="Pick model"
        data={
          wheelTypes &&
          wheelTypes.map((model, index) => ({
            label: model,
            value: String(index),
          }))
        }
        style={{ width: 200 }}
        value={selectedWheelType}
        onChange={(value) => setSelectedWheelType(value)}
        clearable
        searchable
      />

      <Button
        onClick={() => {
          handleSearch();
        }}
        style={{ marginTop: 25 }}
      >
        Search
      </Button>
      <Link href="/models/create">
        <Button style={{ marginTop: 25 }}>New model</Button>
      </Link>
    </div>
  );
}
