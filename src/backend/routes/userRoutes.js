import * as userService from "../services/userService.js";
import { generateHash } from "../../utils/utils.js";

/**
 * Registers user-related routes with the provided Express application.
 *
 * @param {object} app - An instance of the Express application.
 *
 * The function sets up the following endpoint:
 * - POST /api/v1/users: Creates a new user using the information provided in the request body.
 *
 * On successful user creation, the endpoint responds with status 201 and returns the created username.
 * If there is a validation error or bad request, it responds with status 400 and the relevant error message.
 * If an internal server error occurs, it responds with status 500.
 */
export const userRoutes = (app) => {
  app.post("/api/v1/users", async (req, res) => {
    try {
      const createUserResult = await userService.createUser(
        req.body,
        async () => await generateHash(req.body.username),
      );

      if (createUserResult.success === true) {
        return res
          .status(201)
          .json({ username: createUserResult.value.username });
      }

      return res.status(400).json(createUserResult);
    } catch (err) {
      console.error("userRoutes.post error", err);
      return res.status(500).end();
    }
  });
};
