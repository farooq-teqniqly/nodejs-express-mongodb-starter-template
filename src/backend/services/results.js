/**
 * Constructs a success result object.
 *
 * @param {string} msg - The success message to be included in the result.
 * @param {*} value - The value to be included in the result.
 * @returns {Object} An object representing the success result with properties:
 *                   - success: A boolean indicating the result is successful (always true)
 *                   - message: The provided success message
 *                   - value: The provided value
 */
const successResult = (msg, value) => {
  return {
    success: true,
    message: msg,
    value,
  };
};

/**
 * Generates an error result object.
 *
 * @param {string} msg - The error message to include in the result.
 * @returns {Object} An object containing the success status and error message.
 */
const errorResult = (msg) => {
  return {
    success: false,
    message: msg,
  };
};

export { successResult, errorResult };
