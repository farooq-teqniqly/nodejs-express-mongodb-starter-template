const successResult = (msg, value) => {
  return {
    success: true,
    message: msg,
    value,
  };
};

const errorResult = (msg) => {
  return {
    success: false,
    message: msg,
  };
};

export { successResult, errorResult };
