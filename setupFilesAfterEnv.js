import { jest } from "@jest/globals";
import * as db from "./src/utils/mongodb/db.js";

global.jest = jest;

beforeAll(async () => {
  await db.connect(process.env.DATABASE_URL);
});

afterAll(async () => {
  await db.disconnect();
});
