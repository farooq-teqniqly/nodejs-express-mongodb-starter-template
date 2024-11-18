import { User } from "../../utils/mongodb/schemas.js";
import { errorResult, successResult } from "./results.js";

/**
 * Creates a new user in the system.
 *
 * This asynchronous function checks for the existence of the user with
 * the provided username. If the user does not already exist, it generates
 * a unique ID for the user, saves the new user to the database, and returns
 * a success result.
 *
 * @param {Object} params - The user parameters.
 * @param {string} params.username - The username of the new user.
 * @param {string} params.password - The password of the new user.
 * @param {Function} idGen - Function to generate a unique ID for the user.
 *
 * @returns {Promise<Object>} Returns a promise that resolves to a success result
 * if the user is created successfully or an error result if there is an error.
 */
const createUser = async ({ username, password }, idGen) => {
  if (!username) {
    throw new Error("username is required");
  }

  if (!password) {
    throw new Error("password is required");
  }

  if (!idGen) {
    throw new Error("id generator function is required");
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return errorResult("user already exists");
    }

    const id = await idGen({ username });
    const user = new User({ id, username, password });
    const createdUser = await user.save();

    return successResult("user created", createdUser);
  } catch (err) {
    const msg = "createUser error";
    console.error(msg, err);
    return errorResult(err);
  }
};

/**
 * Retrieves a user by their username.
 *
 * This asynchronous function fetches a user from the database
 * based on the provided username. If the username is not provided,
 * an error result is returned. If the user is not found in the
 * database, an error result is also returned. If the user is found,
 * a success result including the user data is returned.
 *
 * @param {Object} params - The parameters for retrieving the user.
 * @param {string} params.username - The username of the user to retrieve.
 * @returns {Promise<Object>} Resolves to an object containing either
 *                            an error or success result.
 */
const getUser = async ({ username }) => {
  if (!username) {
    throw new Error("username is required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return errorResult("user not found");
  }

  return successResult("user found", user);
};

export { createUser, getUser };
