import type { Priority } from "./priority";
import type { Status } from "./status";
import type { FilterOption, order, SortOption, task } from "./Task";

export interface Pagination {
  currPage: number;
  totalPage: number;
}

export interface TaskContextType {
  // UI
  isSearchBoxOpen: boolean;
  setIsSearchBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSearchBox: () => void;

  // Pagination
  pagination: Pagination;
  maxPerPage: number;
  maxPagesLength: number;

  // Tasks
  tasks: task[];
  selectedTask?: task;
  setSelectedTask: React.Dispatch<React.SetStateAction<task | undefined>>;

  // Metadata
  priorities: Priority[];
  statuses: Status[];

  // Filter & Sort
  filterOption: FilterOption;
  setFilterOption: React.Dispatch<React.SetStateAction<FilterOption>>;

  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;

  sortOrder: order;
  setSortOrder: React.Dispatch<React.SetStateAction<order>>;

  // Actions
  refreshTasks: () => Promise<void>;
}