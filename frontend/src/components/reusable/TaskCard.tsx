import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { task } from "@schemas/task/Task";
import { formatDate } from "@utils/index";
import { usehandleTask } from "@hooks/usehandleTask";
import { useAuth } from "@context/auth/useAuth";
import ConfirmDialog from "./ConfirmDialog";

interface TaskCardProps {
  task: task;
  onDelete?: (taskId: string) => void;
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-200 text-gray-700";
    case "in-progress":
      return "bg-blue-200 text-blue-700";
    case "review":
      return "bg-purple-200 text-purple-700";
    case "done":
      return "bg-green-200 text-green-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const taskHandler = token ? usehandleTask(token) : null;
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const date = formatDate(task.dueAt);

  const handleDelete = async () => {
    if (!taskHandler) return;

    setIsDeleting(true);
    try {
      const res = await taskHandler.deleteTask(task._id);
      if (res?.ok) {
        setShowConfirm(false);
        onDelete?.(task._id);
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      onClick={() => {
        navigate(`/tasks/${task._id}`);
      }}
      className="w-full h-auto max-h-40 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
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
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2.5 py-1 text-xs font-medium border rounded-full whitespace-nowrap ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="aspect-square h-8 w-8 overflow-hidden rounded-full hover:bg-red-100 bg-gray-100 flex items-center justify-center cursor-pointer transition-colors group/delete"
            title="Delete task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-600 group-hover/delete:text-red-600 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-600">
              +{task.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
            task.status
          )}`}
        >
          {task.status.replace("-", " ")}
        </span>
        <span className="text-xs text-gray-500">
          Due {date.date()} at {date.time()}
        </span>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TaskCard;
