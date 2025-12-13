import { useEffect, useState } from "react";
import TaskContext from "./task.context";
import type { Panigation } from "@schemas/task/context";
import type { task } from "@schemas/task/Task";
import { mockTasks } from "@assets/mockTask";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const priorities: Priority[] = ["Low", "Medium", "High"];
  const statuses: Status[] = ["todo", "in-progress", "review", "done"];

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
  const [Task, setTask] = useState<task | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setTasks([...mockTasks].reverse());
      setPanigation({
        currPage: 0,
        totalPage: Math.ceil(mockTasks.length / maxPerPage),
      });
    }, 100);
  }, []);

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
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
