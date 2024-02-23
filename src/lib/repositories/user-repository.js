import User from "@/models/user.model";
import { Query } from "mongoose";

const create = async (payload) => {
  return await User.create(payload);
};
const findOne = async ({ query, select }) => {
  return User.findOne(query).select(select);
};
const getUserToken = async ({ token }) => {
  return await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });
};
const getUserDataWithoutPassword = async ({ username }) => {
  return await User.findOne({ username: username }).select("-password");
};

const insertVerifyToken = async ({ email, hashedToken }) => {
  return User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      },
    },
    { new: true }
  ).select("-password");
};
const updateProfile = async ({ username, dpURL, coverURL, name, bio }) => {
  return await User.findOneAndUpdate(
    { username: username },
    { $set: { dpURL, coverURL, name, bio } },
    {
      new: true,
    }
  );
};

export const userRepository = {
  create,
  findOne,
  getUserDataWithoutPassword,
  insertVerifyToken,
  getUserToken,
  updateProfile,
};
