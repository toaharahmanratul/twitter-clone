import connectDB from "@/config/database";
import { getUserData, updateUserProfile } from "@/lib/services/user-services";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async (req, res) => {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      error: "User is not authenticated.",
    });
  }

  switch (req.method) {
    case "GET":
      return await getUserData(req, res);
    case "PUT":
      return await updateUserProfile(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};
