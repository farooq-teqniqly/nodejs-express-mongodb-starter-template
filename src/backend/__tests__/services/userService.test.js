import { User } from "../../../utils/mongodb/schemas.js";
import * as userService from "../../services/userService.js";
import * as generator from "../utils/dataGenerator.js";

import { expect } from "@jest/globals";

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("createUser", () => {
  test("creates the user if it does not exist", async () => {
    const userData = generator.generateUser();
    const idGen = () => generator.generateId();

    const result = await userService.createUser(userData, idGen);

    expect(result.success).toEqual(true);
    expect(result.message).toEqual("user created");
    expect(result.value).toEqual(expect.objectContaining(userData));
  });

  test("can't create a user with the same username", async () => {
    const userData = generator.generateUser();
    const idGen = () => generator.generateId();

    let result = await userService.createUser(userData, idGen);

    expect(result.success).toEqual(true);

    result = await userService.createUser(userData, idGen);

    expect(result.success).toEqual(false);
    expect(result.message).toEqual("user already exists");
  });
});

describe("getUser", () => {
  test("returns the user", async () => {
    const userData = generator.generateUser();
    const userId = generator.generateId();
    const idGen = () => userId;

    let result = await userService.createUser(userData, idGen);

    expect(result.success).toEqual(true);

    result = await userService.getUser({ username: userData.username });

    expect(result.success).toEqual(true);
    expect(result.message).toEqual("user found");

    const foundUser = result.value;
    expect(foundUser).toEqual(expect.objectContaining(userData));
    expect(foundUser.id).toEqual(userId);
    expect(foundUser).toHaveProperty("createdAt");
    expect(foundUser).toHaveProperty("updatedAt");
  });

  test("returns not found if the user does not exist", async () => {
    const result = await userService.getUser({ username: "foo" });

    expect(result.success).toEqual(false);
    expect(result.message).toEqual("user not found");
  });
});
