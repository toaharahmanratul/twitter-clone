import connectDB from "@/config/database";
import { deleteUserPost, getUserPosts, updateUserPost } from "@/lib/services/post-services";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      return getUserPosts(req, res);
    case "DELETE":
      return deleteUserPost(req, res);
    case "PATCH":
      return updateUserPost(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
