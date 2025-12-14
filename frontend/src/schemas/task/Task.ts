import type { priority, status } from ".";

export type SortOption = "none" | "dueDate" | "priority";
export type FilterOption = "none" | priority.Priority;
export type order = "asc" | "desc";

export interface List {
  sort: SortOption[];
  filter: FilterOption[];
  order: order[];
}

export interface task {
  id: number;
  title: string;
  description: string;
  dueAt: string;
  priority: priority.Priority;
  status: status.Status;
  tags: string[];
  assignee: string;
  createdAt: string;
  updatedAt: string;
}
