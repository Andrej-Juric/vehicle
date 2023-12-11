"use client";
import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import Link from "next/link";
import VehicleMakeService from "@/services/VehicleMakeService";

// const plugins = {
//   dvr: dvr(validatorjs),
// };

// const hooks = {
//   onSuccess(form) {
//     alert("Form is valid! Send the request here.");

//     console.log("Form Values!", form.values());
//   },
//   onError(form) {
//     alert("Form has errors!");

//     console.log("All form errors", form.errors());
//   },
// };

// const fields = [
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Insert Email",
//     rules: "required|email|string|between:5,25",
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Insert Password",
//     rules: "required|string|between:5,25",
//     type: "password",
//   },
// ];

// const myForm = new MobxReactForm({ fields }, { plugins, hooks });

export default function CreateMake() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !abrv) {
        console.error("treba sve ispunit");
        return;
      }

      const makeData = {
        abbreviation: abrv,
        name: name,
      };

      await VehicleMakeService.create({ makeData });

      console.log("uspjelo");
    } catch (error) {
      console.error("error", error);
    }
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
        <TextInput
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          mt="md"
          label="Abbreviation"
          placeholder="Abrv"
          value={abrv}
          onChange={(e) => setAbrv(e.target.value)}
        />
        <Group justify="center" mt="xl">
          <Button onClick={handleSubmit} type="submit" color="teal">
            Save
          </Button>
          <Link href="/makes">
            <Button color="red">Cancel</Button>
          </Link>
        </Group>
      </Box>
    </Flex>
  );
}
