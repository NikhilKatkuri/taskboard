import { Request, Response, NextFunction } from "express";
import { Task } from "../models/Task";
import { validationResult } from "express-validator";

interface AuthRequest extends Request {
  userId?: string;
}

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = { owner: req.userId };
    const tasks = await Task.find(filter);
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, status, dueAt, tags } = req.body;

    const fin = await Task.findOne({ title, owner: req.userId });
    if (fin) {
      return res.status(400).json({ message: "Task with this title exists" });
    }

    if (new Date(dueAt) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      dueAt,
      owner: req.userId,
      tags: tags || [],
    });

    await task.save();

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    if (req.body.dueAt && new Date(req.body.dueAt) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    Object.assign(task, req.body);
    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
