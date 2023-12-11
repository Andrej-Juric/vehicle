import React from "react";
import { useFilter, FilterProvider } from "../../context/FilterContext";
import { Select, Button } from "@mantine/core";
import Link from "next/link";

export default function FilterBar({}) {
  const {
    makes,
    models,
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
    selectedFuelType,
    setSelectedFuelType,
    selectedWheelType,
    setSelectedWheelType,
    fuelTypes,
    wheelTypes,
    handleSearch,
  } = useFilter();

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
        onChange={setSelectedModel}
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
        onChange={setSelectedFuelType}
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
        onChange={setSelectedWheelType}
        clearable
        searchable
      />

      <Button onClick={handleSearch} style={{ marginTop: 25 }}>
        Search
      </Button>
      <Link href="/models/create">
        <Button style={{ marginTop: 25 }}>New model</Button>
      </Link>
    </div>
  );
}
