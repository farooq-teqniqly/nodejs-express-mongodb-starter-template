import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

try {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.info(`server running on http://localhost:${port}`);
} catch (err) {
  console.error("server error", err);
}
