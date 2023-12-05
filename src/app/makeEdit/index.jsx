"use client";
import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import React from "react";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import Link from "next/link";

const plugins = {
  dvr: dvr(validatorjs),
};

const hooks = {
  onSuccess(form) {
    alert("Form is valid! Send the request here.");

    console.log("Form Values!", form.values());
  },
  onError(form) {
    alert("Form has errors!");

    console.log("All form errors", form.errors());
  },
};

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Insert Email",
    rules: "required|email|string|between:5,25",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Insert Password",
    rules: "required|string|between:5,25",
    type: "password",
  },
];

const myForm = new MobxReactForm({ fields }, { plugins, hooks });

export default function MakesEdit() {
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
      <Title order={1}>Edit car make</Title>
      <Box>
        <TextInput label="Name" placeholder="Name" />
        <TextInput mt="md" label="Abreviation" placeholder="Abrv" />
        <Group justify="center" mt="xl">
          <Button color="teal">Save</Button>
          <Link href="/makes">
            <Button color="red">Cancel</Button>
          </Link>
        </Group>
      </Box>
    </Flex>
  );
}
