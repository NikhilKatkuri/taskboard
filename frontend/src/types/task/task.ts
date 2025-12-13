import type { priority, status } from ".";

type timepoint = ReturnType<typeof Date.now>;

export interface task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: priority.Priorities;
  status: status.Status;
  tags: string[];
  assignee: string;
  createdAt: timepoint;
  updatedAt: timepoint;
}
