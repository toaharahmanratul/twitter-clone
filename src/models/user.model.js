import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postText: {
      type: String,
      required: true,
    },
    isImageThere: {
      type: Boolean,
      default: false,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const followingFollowersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  dpURL: {
    type: String,
    default: "",
    required: true,
  },
});

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
    posts: [postSchema],
    following: [followingFollowersSchema],
    followers: [followingFollowersSchema],
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
