import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = () => {
  mongoose
    .connect(
      process.env["MONGODB_URI"] || "mongodb://localhost:27017/taskboard"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
};

export default connection;
