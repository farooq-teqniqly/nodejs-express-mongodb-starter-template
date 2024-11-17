import { faker } from "@faker-js/faker";

/**
 * Generates a user object with a random username and password.
 *
 * @function generateUser
 * @returns {Object} An object containing a random username and password.
 * @property {string} username - A randomly generated email address.
 * @property {string} password - A randomly generated password.
 */
const generateUser = () => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };
};

/**
 * Generates a pseudo-random alphanumeric string consisting of 5 characters.
 *
 * The string is generated using the faker library's alphanumeric method.
 *
 * @returns {string} A pseudo-random alphanumeric string of length 5.
 */
const generateId = () => faker.string.alphanumeric(5);

export { generateUser, generateId };
