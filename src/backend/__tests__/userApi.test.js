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

  test("return 422 if user exists", async () => {
    const postData = generator.generateUser();

    await request(app)
      .post("/api/v1/users")
      .send(postData)
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /json/);

    const res = await request(app)
      .post("/api/v1/users")
      .send(postData)
      .set("Accept", "application/json")
      .expect(422)
      .expect("Content-Type", /json/);

    expect(res.body.message).toEqual("user already exists");
  });
});

describe("POST /api/v1/users tests for invalid requests", () => {
  test("required props not specified", async () => {
    const postData = {};

    const res = await request(app)
      .post("/api/v1/users")
      .send(postData)
      .set("Accept", "application/json")
      .expect(422)
      .expect("Content-Type", /json/);

    const { errors } = res.body;
    expect(errors.length).toEqual(4);
    expect(errors[0].msg).toEqual("username is required");
    expect(errors[1].msg).toEqual(
      "username must be between 10 and 100 characters long",
    );
    expect(errors[2].msg).toEqual("password is required");
    expect(errors[3].msg).toEqual(
      "password must be between 5 and 50 characters long",
    );
  });
});
