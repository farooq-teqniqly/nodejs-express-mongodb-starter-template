/**
 * Defines routes for greeting API endpoints.
 *
 * This function sets up a single route handler for the application's Express instance `app`.
 * When a GET request is made to the "/api/v1/greet/:greeting" endpoint, it responds with a
 * JSON object containing the greeting passed in the URL parameter.
 *
 * @param {Object} app - The Express application instance to which the routes are added.
 */
export const greeterRoutes = (app) => {
  app.get("/api/v1/greet/:greeting", async (req, res) => {
    const { greeting } = req.params;
    return res.status(200).json({ greeting });
  });
};
