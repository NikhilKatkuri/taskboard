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
taskRoutes.put("/update/:id", updateTask);
taskRoutes.delete("/delete/:id", deleteTask);

export default taskRoutes;
