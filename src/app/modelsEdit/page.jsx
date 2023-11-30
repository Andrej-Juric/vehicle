import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function ModelEdit() {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
      style={{ paddingTop: 20 }}
    >
      <Title order={1}>Edit car model</Title>
      <Box>
        <TextInput label="Name" placeholder="Name" />
        <TextInput mt="md" label="Abreviation" placeholder="Abrv" />
        <TextInput mt="md" label="Fuel type" placeholder="Abrv" />
        <TextInput mt="md" label="Wheel type" placeholder="Abrv" />
        <Group justify="center" mt="xl">
          <Button color="teal">Save</Button>
          <Link href="/cars">
            <Button color="red">Cancel</Button>
          </Link>
        </Group>
      </Box>
    </Flex>
  );
}
