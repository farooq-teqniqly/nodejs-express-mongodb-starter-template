import mongoose from "mongoose";

/**
 * Establishes a connection to a MongoDB database using the provided URL.
 * If the connection is already open, it won't attempt to reconnect.
 *
 * @param {string} dbUrl - The connection string URL for the MongoDB database.
 * @throws {Error} Will throw an error if `dbUrl` is not provided or if the connection fails.
 * @throws {Error} Will throw an error and log it if a MongoDB error occurs after connection.
 */
const connect = async (dbUrl) => {
  if (!dbUrl) {
    throw new Error("dbUrl is null");
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(dbUrl);
      console.info(`connected to mongodb at ${dbUrl}`);

      mongoose.connection.on("error", (err) => {
        console.error("mongodb error", err);
        throw err;
      });

      mongoose.connection.on("disconnected", () => {
        console.info("disconnected from mongodb");
      });
    }
  } catch (err) {
    console.error("can't connect to mongodb", err);
    throw err;
  }
};

/**
 * Asynchronously disconnects from the MongoDB database if there is an active connection.
 * This function checks the current connection state with Mongoose.
 * If the connection state is 1 (connected), it proceeds to disconnect.
 *
 * @function
 * @async
 * @returns {Promise<void>} A promise that resolves when the disconnection process completes.
 */
const disconnect = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
};

export { connect, disconnect };
