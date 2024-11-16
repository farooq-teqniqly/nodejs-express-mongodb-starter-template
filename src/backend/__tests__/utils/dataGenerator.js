import { faker } from "@faker-js/faker";

const generateUser = () => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };
};

const generateId = () => faker.string.alphanumeric(5);

export { generateUser, generateId };
