"use client";
import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { observer } from "mobx-react";
import Link from "next/link";
import React, { useEffect } from "react";
import editModelForm from "./form";
import modelsStore from "@/stores/ModelsStore";

const ModelEdit = observer(() => {
  const form = editModelForm;
  const modelId = modelsStore.editModelId;
  console.log(modelId, "modelId iz modelsStore.editModelId iz ModelEdit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.onSubmit();
  };

  const handleReset = () => {
    form.onReset();
  };

  useEffect(() => {
    if (modelId) {
      const model = modelsStore.models.find((model) => model.id === modelId);
      console.log(model.makeId, "make id vjerojatno");
      if (model) {
        form.$("makeId").set(model.makeId);
        form.$("name").set(model.name);
        form.$("abrv").set(model.abbreviation);
        form.$("fuelType").set(model.fuel_type);
        form.$("wheelType").set(model.wheel_type);
      }
    }
  }, [modelId]);
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
        <form onSubmit={handleSubmit}>
          <TextInput
            label={form.$("name").label}
            placeholder={form.$("name").placeholder}
            value={form.$("name").value}
            onChange={(e) => form.$("name").set(e.target.value)}
          />
          <TextInput
            label={form.$("makeId").label}
            placeholder={form.$("makeId").placeholder}
            value={String(form.$("makeId").value)}
            onChange={(e) => form.$("makeId").set(e.target.value)}
          />

          <TextInput
            mt="md"
            label={form.$("abrv").label}
            placeholder={form.$("abrv").placeholder}
            value={form.$("abrv").value}
            onChange={(e) => form.$("abrv").set(e.target.value)}
          />
          <TextInput
            mt="md"
            label={form.$("fuelType").label}
            placeholder={form.$("fuelType").placeholder}
            value={form.$("fuelType").value}
            onChange={(e) => form.$("fuelType").set(e.target.value)}
          />
          <TextInput
            mt="md"
            label={form.$("wheelType").label}
            placeholder={form.$("wheelType").placeholder}
            value={form.$("wheelType").value}
            onChange={(e) => form.$("wheelType").set(e.target.value)}
          />
          <Group justify="center" mt="xl">
            <Button onClick={handleSubmit} color="teal">
              Save
            </Button>
            <Button onClick={handleReset} color="teal">
              Reset
            </Button>
            <Link href="/cars">
              <Button color="red">Cancel</Button>
            </Link>
          </Group>
        </form>
      </Box>
    </Flex>
  );
});

export default ModelEdit;
