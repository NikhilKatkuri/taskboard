import { validationResult } from "express-validator";
import { User } from "../models/User";
import express, { Request, Response, NextFunction } from "express";
import { generateToken } from "../middleware/authMiddleware";

const authRoutes = express.Router();

authRoutes.post("/check-email", async (req: Request, res: Response) => {
  const { email } = req.body;
  const foundEmail = await User.findOne({ email });
  const emailExists = !!foundEmail;
  return res.json({
    exists: emailExists,
    email: foundEmail ? foundEmail.email : null,
  });
});

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({ fullName, email, password });
    await user.save();

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", getCurrentUser);

export default authRoutes;
