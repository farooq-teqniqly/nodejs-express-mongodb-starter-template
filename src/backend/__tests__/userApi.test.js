import request from "supertest";
import { app } from "../app.js";
import * as generator from "../__tests__/utils/dataGenerator.js";

describe("POST /api/v1/users", () => {
  test("creates a user", async () => {
    const postData = generator.generateUser();

    const res = await request(app)
      .post("/api/v1/users")
      .send(postData)
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /json/);

    const { username, id, password, createdAt, updatedAt } = res.body;

    expect(username).toEqual(postData.username);
    expect(id).toBeUndefined();
    expect(password).toBeUndefined();
    expect(createdAt).toBeUndefined();
    expect(updatedAt).toBeUndefined();
  });
});
