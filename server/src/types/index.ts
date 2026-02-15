import mongoose, { Document } from "mongoose";

export type Priority = "Low" | "Medium" | "High";
export type Status = "todo" | "in-progress" | "review" | "done";

export interface ITask extends Document {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueAt: Date;
  tags: string[];
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
