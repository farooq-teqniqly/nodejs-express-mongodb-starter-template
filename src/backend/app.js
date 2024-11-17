import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { greeterRoutes } from "./routes/greeterRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
greeterRoutes(app);
userRoutes(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello from Express!</h1>");
});

export { app };
