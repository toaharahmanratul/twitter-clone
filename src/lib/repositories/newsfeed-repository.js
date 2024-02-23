import User from "@/models/user.model";

const getUserSpecificPosts = async () => {
  return User.find().select("name dpURL posts");
};

export const newsfeedRepository = { getUserSpecificPosts };
