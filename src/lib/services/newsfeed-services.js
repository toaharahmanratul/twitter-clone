import User from "@/models/user.model";
import { newsfeedRepository } from "../repositories/newsfeed-repository";
import Post from "@/models/post.model";

export const getSelectedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }
    const postsWithUserInfo = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findOne({ username: post.username }).select(
          "dpURL name"
        );
        return {
          ...post.toObject(),
          name: user.name || "",
          dpURL: user.dpURL || "",
        };
      })
    );
    postsWithUserInfo.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully!",
      posts: postsWithUserInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get posts",
      error: error.message,
    });
  }
};
