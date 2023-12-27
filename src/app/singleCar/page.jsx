"use client";
import { Card, Text, Group, Center, Button, Flex } from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./index.module.css";
import { useParams } from "next/navigation";
import makesStore from "@/stores/MakesStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
import modelsStore from "@/stores/ModelsStore";

const SingleCar = observer(() => {
  const { id } = useParams();
  console.log(id, "id u singleCar");

  useEffect(() => {
    makesStore.fetchMakeById(id);
  }, [id]);

  useEffect(() => {
    modelsStore.fetchModelById(id);
  }, [id]);

  const selectedMake = makesStore.selectedMake;
  const selectedModel = modelsStore.selectedModel;
  console.log(selectedModel);
  // console.log(makesStore.selectedMake, "makestore.selectedmake u single car");
  // console.log(selectedMake, "selectedMake u single car");

  return (
    <Flex
      key={selectedMake ? selectedMake.id : "loading"}
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
      style={{ paddingTop: 20 }}
    >
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between" mt="md">
          <div>
            <Text fw={500}>
              {selectedMake && selectedMake.name}{" "}
              {selectedModel && selectedModel.name}
            </Text>
            <Text fz="xs" c="dimmed">
              Contact us for more information.
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text fz="sm" c="dimmed" className={classes.label}>
            Basic informations
          </Text>

          <Text size="xs">
            Name: {selectedMake && selectedMake.name}{" "}
            {selectedModel && selectedModel.name}
          </Text>

          <Text size="xs">
            Abrv: {selectedMake && selectedMake.abbreviation}{" "}
            {selectedModel && selectedModel.abbreviation}
          </Text>
          {selectedModel && (
            <Text size="xs">
              Fuel Type:
              {selectedModel && selectedModel.fuel_type}
            </Text>
          )}
          {selectedModel && (
            <Text size="xs">
              Wheel Type:
              {selectedModel && selectedModel.wheel}
            </Text>
          )}
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group gap={30}>
            <Button radius="xl">Rent now</Button>
          </Group>
        </Card.Section>
      </Card>
    </Flex>
  );
});

export default SingleCar;
