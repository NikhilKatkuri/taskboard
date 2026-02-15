import { body } from "express-validator";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getCurrentUser, login, register } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("fullName").notEmpty().withMessage("Full name is required"),
  ],
  register
);
authRoutes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

authRoutes.get("/me", authMiddleware, getCurrentUser);

export default authRoutes;
