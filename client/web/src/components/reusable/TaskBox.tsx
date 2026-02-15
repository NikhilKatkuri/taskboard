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
      className="group h-auto w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-600">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${getPriorityColor(
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
