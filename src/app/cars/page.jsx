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
  const [filteredModels, setFilteredModels] = useState([]);
  console.log(selectedMake, selectedModel, "selektirani make i model");
  console.log(makes, models, "models");

  let modelId = models.map((model) => model.id === selectedModel);
  console.log(modelId, "Modelid");

  // console.log(
  //   makes,
  //   "makes",
  //   models,
  //   "models",
  //   selectedMake,
  //   "selectedMake",
  //   filteredMakes,
  //   "filteredMakes"
  // );

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
        }
      } catch (error) {
        console.error("Error fetching models data:", error);
      }
    };

    fetchModels();
  }, [selectedMake, selectedModel]);

  // const handleSearch = () => {
  //   if (!selectedMake) {
  //     setFilteredMakes(models);
  //     return;
  //   }

  //   let filteredItems = models;

  //   if (selectedModel) {
  //     // ako sam odabrao model, filtriraj modele prema odabranoj marki i modelu
  //     let filteredItems = models.filter(
  //       (model) => model.id === selectedModel && model.makeId === selectedMake
  //     );
  //   } else {
  //     // ako nisam odabrao model, filtriraj modele samo prema odabranoj marki
  //     let filteredItems = models.filter(
  //       (model) => model.makeId === selectedMake
  //     );
  //   }
  //   setFilteredMakes(filteredItems);
  // };
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
          <Link href={`/singleCar/${selectedModel && selectedModel.value}`}>
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
          data={["React", "Angular", "Vue", "Svelte"]}
          style={{ width: 200 }}
        />
        <Select
          label="Wheel type"
          placeholder="Pick model"
          data={["React", "Angular", "Vue", "Svelte"]}
          style={{ width: 200 }}
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
