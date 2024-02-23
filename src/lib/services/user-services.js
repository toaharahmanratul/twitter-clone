import { hashPassword } from "@/utils/register/hashPassword";
import { userRepository } from "../repositories/user-repository";
import { sendEmail } from "@/utils/register/mailer";
import User from "@/models/user.model";
import Post from "@/models/post.model";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const isEmailExists = await userRepository.findOne({
      query: { email },
      select: "-password",
    });
    const isUsernameExists = await userRepository.findOne({
      query: { username },
      select: "-password",
    });
    if (isEmailExists || isUsernameExists) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      posts: [],
      coverURL: "",
      bio: "",
    });
    await sendEmail({ email: newUser.email, userId: newUser._id });
    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        posts: newUser.posts,
      },
    });
  } catch (error) {
    query;
    res.status(500).send(error.message);
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userRepository.getUserToken({ token });
    if (!user) {
      return res.status(400).json({
        error: "User not found, invalid token!",
      });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserData = async (req, res) => {
  try {
    const { username } = req.query;
    const userData = await userRepository.findOne({
      query: { username },
      select: "-password",
    });
    if (!userData) {
      return res.status(400).json({
        error: "User not found, invalid token!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully!",
      userData: userData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.query;
    const { dpURL, coverURL, name, bio } = req.body;

    const updatedUser = await userRepository.updateProfile({
      username,
      dpURL,
      coverURL,
      name,
      bio,
    });

    if (updatedUser) {
      return res.status(200).json({
        message: "Profile updated successfully",
        updatedUser: updatedUser,
      });
    } else {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
