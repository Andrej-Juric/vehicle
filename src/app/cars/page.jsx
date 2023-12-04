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
  const [selectedFuelType, setSelectedFuelType] = useState();
  const [wheelTypes, setWheelTypes] = useState([]);
  const [selectedWheelType, setSelectedWheelType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeData = await VehicleMakeService.get();
        setMakes(makeData.item);
      } catch (error) {
        console.error("Error fetching makes data:", error);
      }
      setFilteredMakes(makeData.item);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = await VehicleModelService.get();
        setModels(modelData.item);
        if (modelData) {
          let fuelTyps = [];
          let wheelTyps = [];
          modelData.item.forEach((data) => {
            if (!fuelTyps.includes(data.fuel_type)) {
              fuelTyps.push(data.fuel_type);
            }

            if (!wheelTyps.includes(data.wheel_type)) {
              wheelTyps.push(data.wheel_type);
            }
          });

          if (fuelTyps) {
            setFuelTypes(fuelTyps);
          }

          if (wheelTyps) {
            setWheelTypes(wheelTyps);
          }
        }
      } catch (error) {
        console.error("Error fetching makes data:", error);
      }
    };

    fetchData();
  }, [makes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagination = await VehicleMakeService.pagination(
          currentPage,
          itemsPerPage
        );
        console.log(pagination, "pagination");
        // setMakes(pagination.item);
        setFilteredMakes(pagination.item);
        setCurrentPage(currentPage);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        console.error("Error fetching makes data:", error);
        setCurrentPage(pageNumber);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        if (selectedMake) {
          console.log(selectedMake, "selectedMake");

          const modelData = await VehicleModelService.search(selectedMake);
          setModels(modelData.item);
          console.log(models);
        } else {
          const modelData = await VehicleModelService.get();
          setModels(modelData.item);
        }
      } catch (error) {
        console.error("Error fetching models data:", error);
      }
    };

    fetchModels();
  }, [selectedMake, selectedModel]);

  useEffect(() => {
    handleSearch();
  }, [selectedMake, selectedModel, selectedFuelType, selectedWheelType]);

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
      console.log(makes, "makes");
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
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={5}
          radius="md"
        />
      </Flex>
    </>
  );
}
