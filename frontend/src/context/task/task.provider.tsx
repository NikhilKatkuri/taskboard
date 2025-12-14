import { useEffect, useState } from "react";
import TaskContext from "./task.context";
import type { Panigation } from "@schemas/task/context";
import type {
  FilterOption,
  List,
  order,
  SortOption,
  task,
} from "@schemas/task/Task";
import { mockTasks } from "@assets/mockTask";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const priorities: Priority[] = ["Low", "Medium", "High"];
  const statuses: Status[] = ["todo", "in-progress", "review", "done"];

  // filter and sort state
  const list: List = {
    sort: ["none", "dueDate", "priority"],
    filter: ["none", ...priorities],
    order: ["asc", "desc"],
  };

  const [filterOption, setFilterOption] = useState<FilterOption>(
    list.filter[2]
  );

  const [sortOption, setSortOption] = useState<SortOption>(list.sort[0]);

  const [sortOrder, setSortOrder] = useState<order>(list.order[0]);

  // search box state
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);

  const toggleSearchBox = () => {
    setIsSearchBoxOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchBoxOpen) {
        setIsSearchBoxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchBoxOpen]);

  // panigation state
  const [panigation, setPanigation] = useState<Panigation>({
    currPage: 0,
    totalPage: 0,
  });

  // data
  const maxPerPage: number = 10;
  const MaxPagesLength = 5;
  const viewData = (data: task[]): task[] => {
    return data.slice(
      panigation.currPage * maxPerPage,
      panigation.currPage * maxPerPage + maxPerPage
    );
  };

  // Tasks
  const [Tasks, setTasks] = useState<task[]>([]);
  const [caches, setCaches] = useState<task[]>([]);
  const [Task, setTask] = useState<task | undefined>(undefined);

  useEffect(() => {
    function update() {
      setTimeout(() => {
        setTasks([...mockTasks].reverse());
        setPanigation({
          currPage: 0,
          totalPage: Math.ceil(mockTasks.length / maxPerPage),
        });
      }, 100);
    }
    update();
  }, [Task]);

  useEffect(() => {
    function cacheData() {
      setCaches([...mockTasks].reverse());
    }
    cacheData();
  }, []);

  const getPriotityValue = (priority: Priority): number => {
    switch (priority) {
      case "High":
        return 3;
      case "Medium":
        return 2;
      case "Low":
        return 1;
      default:
        return 0;
    }
  };

  // Combined filter and sort effect
  useEffect(() => {
    function processData() {
      let processedTasks: task[] = [...caches];

      if (filterOption !== "none") {
        processedTasks = processedTasks.filter(
          (task) => task.priority === filterOption
        );
      }

      if (sortOption !== "none") {
        processedTasks.sort((a, b) => {
          if (sortOption === "dueDate") {
            const aD = new Date(a.dueAt.date).getTime();
            const bD = new Date(b.dueAt.date).getTime();
            return sortOrder === "asc" ? aD - bD : bD - aD;
          } else if (sortOption === "priority") {
            const aP = getPriotityValue(a.priority);
            const bP = getPriotityValue(b.priority);
            return sortOrder === "asc" ? aP - bP : bP - aP;
          }
          return 0;
        });
      }

      // Step 3: Update state
      setTasks(processedTasks);
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(processedTasks.length / maxPerPage),
      });
    }
    processData();
  }, [caches, filterOption, sortOption, sortOrder, maxPerPage]);

  // context values
  const values = {
    Tasks,
    setTasks,
    isSearchBoxOpen,
    setIsSearchBoxOpen,
    panigation,
    setPanigation,
    viewData,
    maxPerPage,
    MaxPagesLength,
    Task,
    setTask,
    priorities,
    statuses,
    toggleSearchBox,
    list,
    filterOption,
    setFilterOption,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
    caches,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
