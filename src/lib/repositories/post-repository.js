import Post from "@/models/post.model";
import User from "@/models/user.model";

const createANewPost = async ({ username, post }) => {
  return User.findOneAndUpdate(
    { username: username },
    { $push: { posts: post } },
    { new: true }
  ).select("-password");
};
const deleteAPost = async ({ postId }) => {
  return Post.findByIdAndDelete(postId);
};
const updateAPost = async ({ postId, newPostText, newImageURL, likes }) => {
  return Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        postText: newPostText,
        imageURL: newImageURL,
        likes: likes,
      },
    },
    { new: true }
  );
};

export const postRepository = {
  createANewPost,
  deleteAPost,
  updateAPost,
};
