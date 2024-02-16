import connectDB from "@/config/database";
import { createUser } from "@/lib/services/user-services";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "POST":
      return createUser(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
