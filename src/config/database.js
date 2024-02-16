import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected successfully");
  } catch (error) {
    throw new Error("Error connecting to mongoose");
  }
};

export default connectDB;
