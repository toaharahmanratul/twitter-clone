import User from "@/models/user.model";
import { postRepository } from "../repositories/post-repository";
import Post from "@/models/post.model";

export const createPost = async (req, res) => {
  try {
    const post = req.body.post;
    console.log("In createPost service: ", post);
    const newPost = await Post.create(post);
    if (!newPost) {
      return res.status(404).json({
        success: false,
        message: "Post cannot be created!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post created successfully!",
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const username = req.query.post[0];
    console.log("getUserPosts service: ", { username });
    const posts = await Post.find({ username: username });
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found!",
      });
    }
    console.log("getUserPosts service, posts: ", { posts });
    posts.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully!",
      posts: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

export const deleteUserPost = async (req, res) => {
  try {
    const params = req.query.post;
    const postId = params[0];
    await postRepository.deleteAPost({ postId });
    console.log("DeleteUserPost service, deleted post successfully!");
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

export const updateUserPost = async (req, res) => {
  try {
    const params = req.query.post;
    const postId = params[0];
    const { newPostText, newImageURL, likes } = req.body;

    console.log("In updateUserPost, req.body: ", {
      newPostText,
      newImageURL,
      likes,
    });
    const updatedUser = await postRepository.updateAPost({
      postId,
      newPostText,
      newImageURL,
      likes,
    });

    if (!updatedUser) {
      console.log("User or post not found");
      return res.status(404).json({
        success: false,
        message: "User or post not found",
      });
    }
    console.log("Post successfully updated!", { updatedUser });
    return res.status(200).json({
      success: true,
      message: "Post successfully updated!",
      data: {
        newPostText,
        newImageURL,
        likes,
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};
