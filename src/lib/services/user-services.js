import { hashPassword } from "@/utils/hashPassword";
import { userRepository } from "../repositories/user-repository";
import { sendEmail } from "@/utils/mailer";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const isEmailExists = await userRepository.checkIfEmailExists({
      email: email,
    });
    const isUsernameExists = await userRepository.checkIfUsernameExists({
      username: username,
    });
    if (isEmailExists || isUsernameExists) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.createANewUser({
      name,
      username,
      email,
      password: hashedPassword,
      posts: [],
      dpURL: "",
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
    res.status(500).send(error.message);
  }
};

export const getUserData = async (req, res) => {
  try {
    const { username } = req.query;
    const userData = await userRepository.getUserDataWithoutPassword({
      username: username,
    });
    userData.posts.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully!",
      userData: userData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("In token service, token: ", token);
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
