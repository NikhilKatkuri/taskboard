import { useCallback, useEffect, useState } from "react";
import TaskContext from "./task.context";
import type { Panigation } from "@schemas/task/context";
import type {
  FilterOption,
  List,
  order,
  SortOption,
  task,
} from "@schemas/task/Task";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";
import { useAuth } from "@context/auth/useAuth";
import { API_ENDPOINTS, STORAGE_KEYS, PAGINATION } from "@config/constants";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const priorities: Priority[] = ["Low", "Medium", "High"];
  const statuses: Status[] = ["todo", "in-progress", "review", "done"];
  const { token } = useAuth();
  // filter and sort state
  const list: List = {
    sort: ["none", "dueDate", "priority"],
    filter: ["none", ...priorities],
    order: ["asc", "desc"],
  };

  const [filterOption, setFilterOption] = useState<FilterOption>(
    list.filter[0]
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
  const maxPerPage: number = PAGINATION.MAX_PER_PAGE;
  const MaxPagesLength = PAGINATION.MAX_PAGES_LENGTH;
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

  const getTasks = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(API_ENDPOINTS.TASKS.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.tasks as task[];
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  }, [token]);

  useEffect(() => {
    async function fetchAndSetTasks() {
      const tasksFromServer = await getTasks();
      const tasks = tasksFromServer || [];
      setCaches([...tasks].map((taskItem, index) => ({ ...taskItem, index })));
      localStorage.setItem(
        STORAGE_KEYS.TASKS_CACHE,
        JSON.stringify(
          [...tasks].map((taskItem, index) => ({ ...taskItem, index }))
        )
      );
      setTasks(tasks);
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(tasks.length / maxPerPage),
      });
    }
    fetchAndSetTasks();
  }, [getTasks, maxPerPage]);

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
            const aD = new Date(a.dueAt).getTime();
            const bD = new Date(b.dueAt).getTime();
            return sortOrder === "asc" ? aD - bD : bD - aD;
          } else if (sortOption === "priority") {
            const aP = getPriotityValue(a.priority);
            const bP = getPriotityValue(b.priority);
            return sortOrder === "asc" ? aP - bP : bP - aP;
          }
          return 0;
        });
      }

      setTasks(processedTasks);
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(processedTasks.length / maxPerPage),
      });
    }
    if (caches.length > 0) {
      processData();
    }
  }, [caches, filterOption, sortOption, sortOrder, maxPerPage]);

  const refreshTasks = async () => {
    const tasksFromServer = await getTasks();
    const tasks = tasksFromServer || [];
    setCaches([...tasks].map((taskItem, index) => ({ ...taskItem, index })));
    localStorage.setItem(
      STORAGE_KEYS.TASKS_CACHE,
      JSON.stringify(
        [...tasks].map((taskItem, index) => ({ ...taskItem, index }))
      )
    );
    setTasks(tasks);
    setPanigation({
      currPage: 0,
      totalPage: Math.ceil(tasks.length / maxPerPage),
    });
  };

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
    refreshTasks,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
