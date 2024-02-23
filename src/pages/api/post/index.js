import connectDB from "@/config/database";
import { createPost } from "@/lib/services/post-services";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
