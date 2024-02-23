import bcrypt from "bcryptjs";
const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
