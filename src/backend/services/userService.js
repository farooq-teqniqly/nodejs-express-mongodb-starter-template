import { User } from "../../utils/mongodb/schemas.js";
import { errorResult, successResult } from "./results.js";

/**
 * Asynchronously creates a new user.
 *
 * @param {Object} options - The user details.
 * @param {string} options.username - The username of the new user.
 * @param {string} options.password - The password of the new user.
 * @param {Function} idGen - Function to generate a unique ID for the user.
 *
 * @throws {Error} If the username, password, or idGen function is not provided.
 * @throws {Error} If there is an error during the user creation process.
 *
 * @returns {Promise<Object>} A promise that resolves to the result of the user creation process, either success or error.
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

    const id = idGen({ username });
    const user = new User({ id, username, password });
    const createdUser = await user.save();

    return successResult("user created", createdUser);
  } catch (err) {
    const msg = "createUser error";
    console.error(msg, err);
    return errorResult(err);
  }
};

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
