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

export default function Cars() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [filteredMakes, setFilteredMakes] = useState([]);

  // console.log(makes, "makes");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeData = await VehicleMakeService.get();
        // console.log(makeData, "makeData");
        setMakes(makeData.item);
        setFilteredMakes(makeData.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (selectedMake) {
      const filteredCars = makes.filter((car) => car.name === selectedMake);
      setFilteredMakes(filteredCars);
    } else {
      setFilteredMakes(makes);
      console.log("ne valja");
    }
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
          <Link href="/singleCar">
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
          data={makes.map((make) => ({ label: make.name, value: make.name }))}
          searchable
          style={{ width: 200 }}
          onChange={(selected) => setSelectedMake(selected)}
        />
        <Select
          label="Choose models"
          placeholder="Pick model"
          data={["React", "Angular", "Vue", "Svelte"]}
          style={{ width: 200 }}
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
