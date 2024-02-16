import User from "@/models/user.model";

export const createPost = async (req, res) => {
  try {
    const post = req.body.post;
    const userEmail = req.body.post.userEmail;
    console.log({ post });
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { posts: post } },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post created successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add post",
      error: error.message,
    });
  }
};
