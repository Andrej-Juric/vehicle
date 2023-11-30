"use client";
import { Autocomplete, Group, Burger, rem, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./index.module.css";
import Link from "next/link";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <Link href="/">
              <Button variant="outline" color="teal" radius="md">
                Home
              </Button>
            </Link>

            <Link href="/cars">
              <Button variant="outline" color="teal" radius="md">
                Find your car
              </Button>
            </Link>
            <Link href="/makes">
              <Button variant="outline" color="teal" radius="md">
                Makes
              </Button>
            </Link>
          </Group>
        </Group>
      </div>
    </header>
  );
}
