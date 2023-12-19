import { useFilter } from "@/context/FilterContext2";
import { Button, Select } from "@mantine/core";
import Link from "next/link";

export default function FilterBar2({
  makes,
  models,
  fuelTypes,
  wheelTypes,
  selectedMake,
  selectedModel,
  selectedFuelType,
  selectedWheelType,
}) {
  const [filterState, setFilter] = useFilter();
  console.log(filterState, "filterstate");

  const handleSearch = () => {
    let filteredItems = models;

    console.log(filteredItems, "filtered items iz filterbar2");

    if (selectedMake) {
      filteredItems = models.filter(
        (model) =>
          (!filterState.selectedFuelType ||
            model.fuel_type === fuelTypes[filterState.selectedFuelType]) &&
          (!selectedMake || model.makeId === selectedMake) &&
          (!selectedModel || model.id === selectedModel) &&
          (!selectedWheelType ||
            model.wheel_type === wheelTypes[selectedWheelType])
      );
    } else if (models && (filterState.selectedFuelType || selectedWheelType)) {
      filteredItems = models.filter(
        (model) =>
          (!filterState.selectedFuelType ||
            model.fuel_type === fuelTypes[filterState.selectedFuelType]) &&
          (!selectedWheelType ||
            model.wheel_type === wheelTypes[selectedWheelType])
      );
    } else {
      filteredItems = makes;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      filteredMakes: Array.isArray(filteredItems) ? filteredItems : [],
    }));
  };

  return (
    <>
      <div>
        <Select
          label="Choose makes"
          placeholder="Pick car"
          data={makes.map((make) => ({ label: make.name, value: make.id }))}
          style={{ width: 200 }}
          value={selectedMake}
          onChange={(value) => setFilter({ selectedMake: value })}
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
          onChange={(value) => setFilter({ selectedModel: value })}
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
          onChange={(value) => setFilter({ selectedFuelType: value })}
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
          value={filterState.selectedWheelType}
          onChange={(value) => setFilter({ selectedWheelType: value })}
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
    </>
  );
}
