import { createContext } from "react";
import { TaskContextType } from "../../schemas/task/context";
 
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export default TaskContext;
