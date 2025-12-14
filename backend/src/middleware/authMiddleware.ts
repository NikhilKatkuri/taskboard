import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env["JWT_SECRET"] || "your-secret-key";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (typeof decoded !== "object" || !decoded["userId"]) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded["userId"];
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};
