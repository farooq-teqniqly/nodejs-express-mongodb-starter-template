import request from "supertest";
import { app } from "../app.js";

describe("GET /", () => {
  test("returns the HTML greeting", async () => {
    const res = await request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect(200);

    expect(res.text).toEqual("<h1>Hello from Express!</h1>");
  });
});
