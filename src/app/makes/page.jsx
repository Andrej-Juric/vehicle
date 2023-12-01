"use client";
import VehicleMakeService from "@/services/VehicleMakeService";
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Flex,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Makes() {
  const [makes, setMakes] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeData = await VehicleMakeService.get();
        // console.log(makeData, "makeData");
        setMakes(makeData.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rows = makes.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Anchor fz="sm" fw={500}>
            {item.name}
          </Anchor>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{item.abbreviation}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.id}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={5}>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800} style={{ paddingLeft: 20 }}>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Link href="/makes/create">
          <Button>New make</Button>
        </Link>
      </Flex>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Abbreviation</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Edit | Delete</Table.Th>

            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
