import { useNavigate } from "react-router-dom";
import type { task } from "@schemas/task/Task";
import { formatDate } from "@utils/index";

interface TaskBoxProps {
  task: task;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 border-red-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Low":
      return "bg-green-100 text-green-700 border-green-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const TaskBox = ({ task }: TaskBoxProps) => {
  const navigate = useNavigate();
  const date = formatDate(task.dueAt);
  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="w-full h-auto p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
        <span
          className={`px-2.5 py-1 text-xs font-medium border rounded-full whitespace-nowrap shrink-0 ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">
          Due {date.date()} at {date.time()}
        </span>
      </div>
    </div>
  );
};

export default TaskBox;
