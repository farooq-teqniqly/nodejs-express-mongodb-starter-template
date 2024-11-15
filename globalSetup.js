import { GenericContainer } from "testcontainers";

const port = 27017;
const image = "mongo:7.0.15";
const dbName = "testdb";

export default async function globalSetup() {
  const mongoContainer = await new GenericContainer(image)
    .withExposedPorts(port)
    .start();

  global.__MONGOCONTAINER = mongoContainer;
  process.env.DATABASE_URL = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(port)}/${dbName}`;
}
