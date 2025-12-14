// src/server.ts
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./controllers/connection";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
dotenv.config();

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: process.env["CLIENT_URL"] || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// Connect to MongoDB
connection();

// Start server
const PORT = process.env["PORT"] || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
