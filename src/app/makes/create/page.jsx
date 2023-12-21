"use client";
import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import React from "react";
import Link from "next/link";
import makesStore from "@/stores/MakesStore";
import { observer } from "mobx-react";
import createForm from "./form";

const CreateMake = observer(() => {
  const form = createForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.onSubmit();
  };

  const handleReset = () => {
    form.onReset();
  };

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
      <Title order={1}>Create new make</Title>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextInput
            label={form.$("name").label}
            placeholder={form.$("name").placeholder}
            value={form.$("name").value}
            onChange={(e) => form.$("name").set(e.target.value)}
            error={form.$("name").error}
          />
          <TextInput
            label={form.$("abrv").label}
            placeholder={form.$("abrv").placeholder}
            value={form.$("abrv").value}
            onChange={(e) => form.$("abrv").set(e.target.value)}
            error={form.$("abrv").error}
          />
          <Group justify="center" mt="xl">
            <Button onClick={handleSubmit} type="submit" color="teal">
              Save
            </Button>
            <Button onClick={handleReset} type="button" color="teal">
              Reset
            </Button>
            <Link href="/makes">
              <Button color="red">Cancel</Button>
            </Link>
          </Group>
        </form>
      </Box>
    </Flex>
  );
});

export default CreateMake;
