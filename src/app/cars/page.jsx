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
  rem,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "./index.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { observer } from "mobx-react";
import makesStore from "@/stores/MakesStore";
import modelsStore from "@/stores/ModelsStore";
import VehicleModelService from "@/services/VehicleModelService";

const Cars = observer(() => {
  useEffect(() => {
    // makesStore.fetchMakes();
    modelsStore.fetchModels();
  }, []);

  useEffect(() => {
    makesStore.fetchPaginatedMakes();
  }, [makesStore.currentPage]);

  useEffect(() => {
    modelsStore.setFuelAndWheelTypes(modelsStore.models);
  }, [modelsStore.models]);

  useEffect(() => {
    modelsStore.fetchModels(makesStore.selectedMake);
  }, [makesStore.selectedMake]);

  useEffect(() => {
    handleSearch();
  }, [
    makesStore.selectedMake,
    modelsStore.selectedModel,
    modelsStore.selectedFuelType,
    modelsStore.selectedWheelType,
  ]);

  const handleSearch = () => {
    const searchQuery = [];

    if (makesStore.selectedMake) {
      searchQuery.push(`${makesStore.selectedMake}`);
    }

    if (modelsStore.selectedModel) {
      searchQuery.push(`${modelsStore.selectedModel}`);
    }

    if (modelsStore.selectedFuelType) {
      searchQuery.push(`${modelsStore.selectedFuelType}`);
    }

    if (modelsStore.selectedWheelType) {
      searchQuery.push(`${modelsStore.selectedWheelType}`);
    }

    if (searchQuery.length === 0) {
      makesStore.setFilteredMakes([]);
      return;
    }

    const queryString = searchQuery.join("&");

    VehicleModelService.search(queryString)
      .then((response) => {
        const filteredItems = response.item;
        makesStore.setFilteredMakes(filteredItems);
        // makesStore.setSelectedMake();
      })
      .catch((error) => {
        console.error("Error in handleSearch:", error);
      });
  };

  const handleMakeChange = (value) => {
    modelsStore.setSelectedModel(null);
    modelsStore.setSelectedFuelType(null);
    modelsStore.setSelectedWheelType(null);

    makesStore.setSelectedMake(value);

    makesStore.fetchPaginatedMakes();
  };

  const handleReset = () => {
    modelsStore.setSelectedModel(null);
    modelsStore.setSelectedFuelType(null);
    modelsStore.setSelectedWheelType(null);

    makesStore.fetchPaginatedMakes();
  };

  const handleDelete = (id) => {
    modelsStore.deleteModel(id);
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
          <Link href={`/cars/${modelsStore.selectedModel || make.id}`}>
            <Button radius="md" style={{ flex: 1 }}>
              Show details
            </Button>
          </Link>

          {makesStore.selectedMake && (
            <ActionIcon variant="default" radius="md" size={36}>
              <Link
                href={`/models/${modelsStore.selectedModel || make.id}/edit`}
              >
                <IconEdit className={classes.like} stroke={1.5} />
              </Link>
            </ActionIcon>
          )}
          {makesStore.selectedMake && (
            <ActionIcon
              onClick={() => handleDelete(id)}
              variant="subtle"
              color="red"
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          )}
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
          data={makesStore.makes.map((make) => ({
            label: make.name,
            value: make.id,
          }))}
          style={{ width: 200 }}
          value={makesStore.selectedMake}
          onChange={(value) => makesStore.setSelectedMake(value)}
          // onChange={(value) => {
          //   handleMakeChange(value);
          // }}
          clearable
          searchable
        />
        <Select
          label="Choose models"
          placeholder="Pick model"
          data={
            modelsStore.models &&
            makesStore.selectedMake &&
            modelsStore.models
              .filter(
                (model) =>
                  !makesStore.selectedMake ||
                  model.makeId === makesStore.selectedMake
              )
              .map((model) => ({
                label: model.name,
                value: model.id,
              }))
          }
          style={{ width: 200 }}
          value={modelsStore.selectedModel}
          // onChange={(value) => modelsStore.setSelectedModel(value)}
          onChange={(value) => {
            handleMakeChange(value);
          }}
          clearable
          searchable
        />
        <Select
          label="Engine/Fuel type"
          placeholder="Pick model"
          data={
            modelsStore.fuelTypes &&
            modelsStore.fuelTypes.map((model, index) => ({
              label: model,
              // value: String(index),
              value: model,
            }))
          }
          style={{ width: 200 }}
          value={modelsStore.selectedFuelType}
          onChange={(value) => modelsStore.setSelectedFuelType(value)}
          clearable
          searchable
        />
        <Select
          label="Wheel type"
          placeholder="Pick model"
          data={
            modelsStore.wheelTypes &&
            modelsStore.wheelTypes.map((model, index) => ({
              label: model,
              // value: String(index),
              value: model,
            }))
          }
          style={{ width: 200 }}
          value={modelsStore.selectedWheelType}
          onChange={(value) => modelsStore.setSelectedWheelType(value)}
          clearable
          searchable
        />

        <Button onClick={handleSearch} style={{ marginTop: 25 }}>
          Search
        </Button>
        <Button onClick={handleReset} style={{ marginTop: 25 }}>
          Reset
        </Button>
        <Link href="/models/create">
          <Button style={{ marginTop: 25 }}>New model</Button>
        </Link>
      </Flex>

      <Space h="xl" />

      <Divider my="sm" />

      <Grid style={{ padding: 20 }}>
        {makesStore.filteredMakes &&
          makesStore.filteredMakes.map((make, index) => (
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
          value={makesStore.currentPage}
          onChange={(value) => makesStore.setCurrentPage(value)}
          total={5}
          radius="md"
        />
      </Flex>
    </>
  );
});

export default Cars;
