import User from "@/models/user.model";

const createANewUser = async (payload) => {
  return await User.create(payload);
};
const checkIfEmailExists = async ({ email }) => {
  return await User.findOne({ email: email });
};
const checkIfUsernameExists = async ({ username }) => {
  return await User.findOne({ username: username });
};
const getUserDataWithoutPassword = async ({ username }) => {
  return await User.findOne({ username: username }).select("-password");
};

const getUserToken = async ({ token }) => {
  return await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });
};

export const userRepository = {
  createANewUser,
  checkIfEmailExists,
  checkIfUsernameExists,
  getUserDataWithoutPassword,
  getUserToken,
};
