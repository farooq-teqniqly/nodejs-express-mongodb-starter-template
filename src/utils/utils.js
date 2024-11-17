import bcrypt from "bcrypt";

const generateHash = async (value, saltRounds = 10) => {
  return await bcrypt.hash(value, saltRounds);
};

export { generateHash };
