import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  await mongoose
    .connect(
      process.env["MONGODB_URI"] || "mongodb://localhost:27017/taskboard"
    )
    .then(() => console.log("\nMongoDB connected"))
    .catch((err) => console.log("\nMongoDB connection error:", err));
};

export default connection;
