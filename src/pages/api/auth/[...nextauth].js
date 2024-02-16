import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import connectDB from "@/config/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user && user.isVerified) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user = {
            ...session.user,
            _id: dbUser._id.toString(),
            username: dbUser.username,
          };
        }
      } catch (error) {
        console.error("Error fetching user data for session:", error);
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connectDB();
        try {
          const isUserExist = await User.findOne({ email: user.email });
          if (!isUserExist) {
            const newUser = await User.create({
              name: user.name,
              username: user.email.split("@")[0],
              email: user.email,
              isVerified: true,
            });
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error saving user", error);
          return false;
        }
      }
    },
  },
};

export default NextAuth(authOptions);
