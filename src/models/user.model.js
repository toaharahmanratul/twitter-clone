import mongoose from "mongoose";

const { Schema } = mongoose;

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    dpURL: {
      type: String,
      default: "",
    },
    coverURL: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    following: [
      {
        type: String,
        required: true,
      },
    ],
    followers: [
      {
        type: String,
        required: true,
      },
    ],
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userschema);
export default User;
