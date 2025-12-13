// tasks.mock.ts
import type { priority, status, task } from "../types/task";

export const mockTasks: task.task[] = [
  {
    id: 1,
    title: "Finish React TaskBoard UI",
    description: "Complete New Task & Edit Task pages with responsive layout.",
    dueDate: "2025-12-15",
    priority: "High" as priority.Priorities,
    status: "in-progress" as status.Status,
    tags: ["react", "assignment"],
    assignee: "user-1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    title: "Write unit tests",
    description: "Cover auth flow and task CRUD scenarios.",
    dueDate: "2025-12-18",
    priority: "Medium" as priority.Priorities,
    status: "todo" as status.Status,
    tags: ["tests"],
    assignee: "user-1",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    title: "Polish empty state UI",
    description: "Refine illustration, helper text, and subtle animations.",
    dueDate: "2025-12-20",
    priority: "Low" as priority.Priorities,
    status: "review" as status.Status,
    tags: ["ui", "design"],
    assignee: "user-2",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
