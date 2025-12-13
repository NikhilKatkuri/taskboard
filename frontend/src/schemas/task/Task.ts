import type { status } from ".";
import type { Priority } from "./priority";

interface TimeDate {
  date: string;
  time: string;
}

export interface task {
  id: number;
  title: string;
  description: string;
  dueAt: TimeDate;
  priority: Priority;
  status: status.Status;
  tags: string[];
  assignee: string;
  createdAt: TimeDate;
  updatedAt: TimeDate;
}
