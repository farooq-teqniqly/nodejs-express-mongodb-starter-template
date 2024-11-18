import * as userService from "../services/userService.js";
import { generateHash } from "../../utils/utils.js";
import { check, validationResult } from "express-validator";

/**
 * An array of validation rules to validate user input fields.
 *
 * The array contains validation rules for the following fields:
 *
 * - "username": Ensures the input is a valid email, and its length
 *                is between 5 and 100 characters.
 * - "password": Ensures the input is a string, and its length
 *                is between 5 and 50 characters.
 *
 * Each rule uses the express-validator library's `check` function
 * to define the validation constraints and corresponding error messages.
 */
const userValidationRules = [
  check("username")
    .isEmail()
    .withMessage("username is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("username must be between 10 and 100 characters long"),

  check("password")
    .isString()
    .withMessage("password is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("password must be between 5 and 50 characters long"),
];

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
  app.post("/api/v1/users", userValidationRules, async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

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

      return res.status(422).json(createUserResult);
    } catch (err) {
      console.error("userRoutes.post error", err);
      return res.status(500).end();
    }
  });
};
