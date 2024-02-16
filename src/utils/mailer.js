import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt, { hash } from "bcryptjs";
const saltRounds = 10;

export const sendEmail = async ({ email, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), saltRounds);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      },
      { new: true }
    ).select("-password");

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e25b3f85868e11",
        pass: "bdc42636e02047",
      },
    });

    const mailOptions = {
      from: "twitterclonetrratul@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">here</a> to verify your email. Or copy and paste the following link to your browser: <br>
      "http://localhost:3000/verifyemail?token=${hashedToken}"</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);

    return { updatedUser, mailResponse };
  } catch (error) {
    throw new Error(error.message);
  }
};
