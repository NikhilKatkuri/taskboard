import type { Priority } from "./priority";
import type { Status } from "./status";
import type { task } from "./Task";

export interface Panigation {
  currPage: number;
  totalPage: number;
}

export interface TaskContextType {
  isSearchBoxOpen: boolean;
  setIsSearchBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  panigation: Panigation;
  setPanigation: React.Dispatch<React.SetStateAction<Panigation>>;
  viewData: (data: task[]) => task[];
  MaxPagesLength: number;
  maxPerPage: number;
  Tasks: task[];
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
  Task: task | undefined;
  setTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  priorities: Priority[];
  statuses: Status[];
}
