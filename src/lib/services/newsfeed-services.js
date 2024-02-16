import User from "@/models/user.model";

export const getSelectedPosts = async (req, res) => {
  try {
    const users = await User.find().select("posts");

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    // Extracting posts from all users
    const allPosts = users.map((user) => user.posts).flat();
    allPosts.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully!",
      posts: allPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get posts",
      error: error.message,
    });
  }
};
