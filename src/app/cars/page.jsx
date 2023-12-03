"use client";
import {
  Card,
  Text,
  Group,
  Button,
  Select,
  Flex,
  Space,
  Badge,
  ActionIcon,
  Divider,
  Pagination,
  Grid,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import classes from "./index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import VehicleMakeService from "@/services/VehicleMakeService";
import VehicleModelService from "@/services/VehicleModelService";

export default function Cars() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [wheelTypes, setWheelTypes] = useState([]);
  console.log(selectedModel, "selected model");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeData = await VehicleMakeService.get();
        setMakes(makeData.item);
        setFilteredMakes(makeData.item);
      } catch (error) {
        console.error("Error fetching makes data:", error);
      }
    };

    fetchData();
  }, [selectedMake, selectedModel]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (selectedMake) {
          const modelData = await VehicleModelService.search(selectedMake);
          console.log(modelData, "modeldata u useeffectu");
          setModels(modelData.item);
          // const allFuelTypes = modelData.item.map((model) => model.fuel_type);
          // const allWheelTypes = modelData.item.map((model) => model.wheel_type);

          // setFuelTypes(allFuelTypes);
          // setWheelTypes(allWheelTypes);
        }
      } catch (error) {
        console.error("Error fetching models data:", error);
      }
    };

    fetchModels();
  }, [selectedMake, selectedModel]);

  const handleSearch = () => {
    if (!selectedMake) {
      setFilteredMakes(models);
      return;
    }

    let filteredItems = models;

    if (selectedModel) {
      filteredItems = models.filter(
        (model) => model.id === selectedModel && model.makeId === selectedMake
      );
    } else {
      filteredItems = models.filter((model) => model.makeId === selectedMake);
    }

    setFilteredMakes(filteredItems);
  };

  const renderCards = (make) => {
    const { name, id } = make;

    return (
      <Card
        withBorder
        radius="md"
        p="md"
        className={classes.card}
        style={{ width: 400 }}
      >
        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {name}
            </Text>
            <Badge size="sm" variant="light">
              {id}
            </Badge>
          </Group>
        </Card.Section>

        <Group mt="xs">
          <Link href={`/cars/${selectedModel || make.id}`}>
            <Button radius="md" style={{ flex: 1 }}>
              Show details
            </Button>
          </Link>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconEdit className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    );
  };

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        style={{ paddingTop: 20 }}
      >
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
            models.map((model) => ({
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
          // data={
          //   models &&
          //   models.map((model) => ({
          //     label: model.fuel_type,
          //     value: model.id,
          //   }))
          // }
          data={selectedModel && { label: selectedMake }}
          style={{ width: 200 }}
          value={fuelTypes}
          onChange={setFuelTypes}
          clearable
          searchable
        />
        <Select
          label="Wheel type"
          placeholder="Pick model"
          data={
            models &&
            models.map((model) => ({
              label: model.wheel_type,
              value: model.id,
            }))
          }
          style={{ width: 200 }}
          value={wheelTypes}
          onChange={setWheelTypes}
        />
        <Select
          label="Sort by name"
          placeholder="Pick model"
          data={["React", "Angular", "Vue", "Svelte"]}
          style={{ width: 200 }}
        />
        <Button onClick={handleSearch} style={{ marginTop: 25 }}>
          Search
        </Button>
        <Link href="/models/create">
          <Button style={{ marginTop: 25 }}>New model</Button>
        </Link>
      </Flex>

      <Space h="xl" />

      <Divider my="sm" />

      <Grid style={{ padding: 20 }}>
        {filteredMakes &&
          filteredMakes.map((make, index) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
              {renderCards(make)}
            </Grid.Col>
          ))}
      </Grid>

      <Space h="xl" />

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Pagination total={5} radius="md" />
      </Flex>
    </>
  );
}
