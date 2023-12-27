import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import React from "react";
import { observer } from "mobx-react";
import editMakeForm from "./form";
import Link from "next/link.js";
import makesStore from "@/stores/MakesStore";

const MakesEdit = observer(() => {
  const form = editMakeForm;
  const makeId = makesStore.editMakeId;
  // console.log(makeId, "makeId iz makesStore.editMakeId iz MakesEdit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.onSubmit();
  };

  const handleReset = () => {
    form.onReset();
  };

  console.log(makeId, "make id iz makesedit");
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
        <form onSubmit={handleSubmit}>
          <TextInput
            {...editMakeForm.$("name").bind()}
            label="Name"
            placeholder="Name"
          />
          <TextInput
            {...editMakeForm.$("abrv").bind()}
            mt="md"
            label="Abbreviation"
            placeholder="Abrv"
          />
          <Group justify="center" mt="xl">
            <Button onClick={editMakeForm.onSubmit} color="teal">
              Save
            </Button>
            <Button onClick={handleReset} color="teal">
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

export default MakesEdit;
