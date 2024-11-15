import request from "supertest";
import { app } from "../app.js";

describe("GET /api/v1/greet", () => {
  test("returns a greeting", async () => {
    const res = await request(app)
      .get("/api/v1/greet/hello")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.greeting).toEqual("hello");
  });
});
