import connectDB from "@/config/database";
import { getSelectedPosts } from "@/lib/services/newsfeed-services";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      return getSelectedPosts(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
