import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>
            Discover the World of Vehicles Now!
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Welcome to our vehicle app - your unique gateway to the exciting
            world of cars, motorcycles, and more! With efficient tools for
            searching, browsing, and tracking vehicles, our app allows you to
            easily explore and find your perfect ride.
          </Text>
          <Link href="/cars">
            <Button
              variant="gradient"
              size="xl"
              radius="xl"
              className={classes.control}
            >
              Find your car
            </Button>
          </Link>
        </Container>
      </div>
    </main>
  );
}
