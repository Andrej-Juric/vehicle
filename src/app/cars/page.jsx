"use client";
import {
  Card,
  Image,
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
  SimpleGrid,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import classes from "./index.module.css";
import Link from "next/link";
import { useEffect } from "react";
import VehicleMakeService from "@/services/VehicleMakeService";

// const fetchData = async () => {
//   try {
//     const makeData = await VehicleMakeService.get();
//     console.log(makeData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

const mockdata = [
  {
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Verudela Beach",
    country: "Croatia",
    description:
      "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1442525411264-a7d45790c3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Mountain Retreat",
    country: "Switzerland",
    description:
      "Experience the tranquility of the Swiss Alps with our Mountain Retreat. Surrounded by breathtaking landscapes, this cozy retreat offers a perfect escape from the hustle and bustle of city life.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576632577811-66e3030b0124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Tropical Paradise",
    country: "Maldives",
    description:
      "Indulge in the luxury of our Tropical Paradise resort in the Maldives. With overwater bungalows, crystal-clear waters, and vibrant coral reefs, it's a dream destination for every traveler.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504851149731-645fc61f9a7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Historic Cityscape",
    country: "Italy",
    description:
      "Immerse yourself in the rich history and culture of Italy with our Historic Cityscape experience. Explore ancient ruins, indulge in delicious cuisine, and stroll through charming cobblestone streets.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1532335551167-5618d5f88d6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Cosy Cabin",
    country: "Norway",
    description:
      "Escape to a cosy cabin in the heart of Norway's wilderness. Surrounded by snow-covered trees and the sound of silence, it's the perfect retreat for nature lovers and adventure seekers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609965164129-d142614f23b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "City Skyline",
    country: "Japan",
    description:
      "Experience the vibrant energy of Japan's city skyline. From bustling streets and neon lights to traditional temples and gardens, this destination offers a blend of modernity and history.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611896653591-e005b9c13a09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Serenity by the Lake",
    country: "Canada",
    description:
      "Find serenity by the lake in Canada's picturesque landscape. Surrounded by towering mountains and pristine waters, it's an ideal location for those seeking peace and natural beauty.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1578487774740-7dcf0b3b1a33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Modern Urban Oasis",
    country: "United States",
    description:
      "Immerse yourself in the modern urban oasis of the United States. Experience the fast-paced lifestyle, iconic landmarks, and diverse culture of this vibrant nation.",
  },
];

export default function Cars() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeData = await VehicleMakeService.get();
        console.log(makeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCards = () => {
    return mockdata.map((data, index) => {
      const { image, title, description, country } = data;

      return (
        <Card
          key={index}
          withBorder
          radius="md"
          p="md"
          className={classes.card}
          style={{ width: 400 }}
        >
          <Card.Section>
            <Image src={image} alt={title} height={180} />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
              <Text fz="lg" fw={500}>
                {title}
              </Text>
              <Badge size="sm" variant="light">
                {country}
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
    });
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
          data={["React", "Angular", "Vue", "Svelte"]}
          style={{ width: 200 }}
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
        <Button style={{ marginTop: 25 }}>Search</Button>
        <Link href="/models/create">
          <Button style={{ marginTop: 25 }}>New model</Button>
        </Link>
      </Flex>

      <Space h="xl" />

      <Divider my="sm" />

      <Grid style={{ padding: 20 }}>
        {renderCards().map((card, index) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
            {card}
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
