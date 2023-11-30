import { Container, Group, Anchor } from "@mantine/core";
import classes from "./index.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>
          Copyright &copy; {new Date().getFullYear()} |{" "}
          <span> Andrej Jurić </span>| {items}
        </Group>
      </Container>
    </div>
  );
}
