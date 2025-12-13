import type { priority, status } from ".";

interface TimeDate {
  date: string;
  time: string;
}

export interface task {
  id: number;
  title: string;
  description: string;
  dueAt: TimeDate;
  priority: priority.Priorities;
  status: status.Status;
  tags: string[];
  assignee: string;
  createdAt: TimeDate;
  updatedAt: TimeDate;
}
