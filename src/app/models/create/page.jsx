"use client";
import {
  Box,
  Button,
  Flex,
  Group,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { observer } from "mobx-react";
import Link from "next/link";
import React, { useEffect } from "react";
import createModelForm from "./form";
import makesStore from "@/stores/MakesStore";
import modelsStore from "@/stores/ModelsStore";

const CreateModel = observer(() => {
  const form = createModelForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.onSubmit();
  };

  const handleReset = () => {
    form.onReset();
  };

  useEffect(() => {
    makesStore.fetchMakes();
  }, []);

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
      <Title order={1}>Create new model</Title>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextInput
            label={form.$("name").label}
            placeholder={form.$("name").placeholder}
            value={form.$("name").value}
            onChange={(e) => form.$("name").set(e.target.value)}
            error={form.$("name").error}
          />
          <Select
            label="Choose makes"
            placeholder="Pick car"
            data={makesStore.makes.map((make) => ({
              label: make.name,
              value: make.id,
            }))}
            style={{ width: 200 }}
            value={makesStore.selectedMake}
            onChange={(value) => {
              console.log("Selected Make ID:", value);
              form.$("makeId").set(value);
              makesStore.setSelectedMake(value);
            }}
            clearable
            searchable
          ></Select>

          <TextInput
            mt="md"
            label={form.$("abrv").label}
            placeholder={form.$("abrv").placeholder}
            value={form.$("abrv").value}
            onChange={(e) => form.$("abrv").set(e.target.value)}
            error={form.$("abrv").error}
          />
          <TextInput
            mt="md"
            label={form.$("fuelType").label}
            placeholder={form.$("fuelType").placeholder}
            value={form.$("fuelType").value}
            onChange={(e) => form.$("fuelType").set(e.target.value)}
            error={form.$("fuelType").error}
          />
          <TextInput
            mt="md"
            label={form.$("wheelType").label}
            placeholder={form.$("wheelType").placeholder}
            value={form.$("wheelType").value}
            onChange={(e) => form.$("wheelType").set(e.target.value)}
            error={form.$("wheelType").error}
          />
          <Group justify="center" mt="xl">
            <Button onClick={handleSubmit} color="teal">
              Save
            </Button>
            <Button onClick={handleReset} type="button" color="teal">
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

export default CreateModel;
