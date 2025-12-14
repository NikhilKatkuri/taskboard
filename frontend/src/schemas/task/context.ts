import type { Priority } from "./priority";
import type { Status } from "./status";
import type { FilterOption, List, order, SortOption, task } from "./Task";

export interface Panigation {
  currPage: number;
  totalPage: number;
}

export interface TaskContextType {
  isSearchBoxOpen: boolean;
  toggleSearchBox: () => void;
  panigation: Panigation;
  setPanigation: React.Dispatch<React.SetStateAction<Panigation>>;
  viewData: (data: task[]) => task[];
  MaxPagesLength: number;
  maxPerPage: number;
  Tasks: task[];
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
  Task: task | undefined;
  caches: task[];
  setTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  priorities: Priority[];
  statuses: Status[];
  list: List;
  filterOption: FilterOption;
  setFilterOption: React.Dispatch<React.SetStateAction<FilterOption>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  sortOrder: order;
  setSortOrder: React.Dispatch<React.SetStateAction<order>>;
}
