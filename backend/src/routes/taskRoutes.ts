import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import express from "express";

const taskRoutes = express.Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/create", createTask);
taskRoutes.post("/update", updateTask);
taskRoutes.delete("/delete", deleteTask);

export default taskRoutes;
