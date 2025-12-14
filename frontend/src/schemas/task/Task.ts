import type { Priority } from "./priority";
import type { Status } from "./status";

export type SortOption = "none" | "dueDate" | "priority";
export type FilterOption = "none" | Priority;
export type order = "asc" | "desc";

export interface List {
  sort: SortOption[];
  filter: FilterOption[];
  order: order[];
}

export interface taskData {
  title: string;
  description: string;
  dueAt: string;
  priority: Priority;
  status: Status;
  tags: string[];
}

export interface task extends taskData {
  _id: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  index?: number;
}
