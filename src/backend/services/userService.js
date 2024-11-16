import { User } from "../../utils/mongodb/schemas.js";
import { errorResult, successResult } from "./results.js";

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

export { createUser };
