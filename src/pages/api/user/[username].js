import connectDB from "@/config/database";
import { getUserData } from "@/lib/services/user-services";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
  await connectDB();
  switch (req.method) {
    case "GET":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({
          error: "User is not authenticated.",
        });
      }
      return await getUserData(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
