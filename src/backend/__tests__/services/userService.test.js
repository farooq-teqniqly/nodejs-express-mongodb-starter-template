import { User } from "../../../utils/mongodb/schemas.js";
import * as userService from "../../services/userService.js";
import { expect } from "@jest/globals";

beforeEach(async () => {
  await User.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("createUser", () => {
  test("creates the user if it does not exist", async () => {
    const userData = {
      username: "foo@bar.com",
      password: "12345",
    };

    const idGen = () => "abc123";

    const result = await userService.createUser(userData, idGen);

    expect(result.success).toEqual(true);
    expect(result.message).toEqual("user created");
    expect(result.value).toEqual(expect.objectContaining(userData));
  });
});
