"use client";
import { Card, Text, Group, Center, Button, Flex } from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./index.module.css";

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconGauge },
  { label: "Automatic gearbox", icon: IconManualGearbox },
  { label: "Electric", icon: IconGasStation },
];

export default function SingleCar() {
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
      style={{ paddingTop: 20 }}
    >
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between" mt="md">
          <div>
            <Text fw={500}>Tesla Model S</Text>
            <Text fz="xs" c="dimmed">
              Contact us for more informations.
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text fz="sm" c="dimmed" className={classes.label}>
            Basic configuration
          </Text>

          <Group gap={8} mb={-8}>
            {features}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group gap={30}>
            <Button radius="xl">Rent now</Button>
          </Group>
        </Card.Section>
      </Card>
    </Flex>
  );
}
