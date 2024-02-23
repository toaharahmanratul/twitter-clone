import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
      required: true,
    },
    likes: [
      {
        type: String,
        required: true,
      },
    ],
    username: {
      type: String,
      required: true,
    },
    reply: [
      {
        reply: {
          type: String,
          required: true,
        },
        imageURL: {
          type: String,
          default: "",
          required: true,
        },
        likes: [
          {
            type: String,
            required: true,
          },
        ],
        username: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postText: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
      required: true,
    },
    likes: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
