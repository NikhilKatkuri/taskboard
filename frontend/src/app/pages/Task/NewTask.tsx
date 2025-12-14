import { useNavigate } from "react-router-dom";
import Input from "@components/reusable/Input";
import Select from "@components/reusable/Select";
import useTask from "@context/task/useTask";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";
import useDropDown from "@hooks/useDropDown";
import { useState } from "react";
import { type taskData } from "@schemas/task/Task";
import { usehandleTask } from "@hooks/usehandleTask";
import { useAuth } from "@context/auth/useAuth";
import { toInputDate } from "@utils/index";

const NewTask = () => {
  const nav = useNavigate();
  const { token } = useAuth();
  const { priorities, statuses } = useTask();
  const taskHandler = token ? usehandleTask(token) : null;

  const [priority, priorityActions] = useDropDown<Priority>(priorities[1]);
  const [status, statusActions] = useDropDown<Status>(statuses[0]);

  const [activeBtn, setActiveBtn] = useState<"none" | "clear" | "submit">(
    "none"
  );

  const getDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString();
  };

  const [taskData, setTaskData] = useState<taskData>({
    title: "",
    description: "",
    dueAt: getDefaultDueDate(),
    priority: priority.value,
    status: status.value,
    tags: [],
  });

  const handleSubmit = async () => {
    if (activeBtn === "clear" || !taskHandler) return;
    setActiveBtn("submit");

    try {
      const updatedTaskData = {
        ...taskData,
        priority: priority.value,
        status: status.value,
      };

      await taskHandler.createTask(updatedTaskData);
      nav("/");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setActiveBtn("none");
    }
  };

  const handleClear = () => {
    if (activeBtn === "submit") return;
    setActiveBtn("clear");
    setTaskData({
      title: "",
      description: "",
      dueAt: getDefaultDueDate(),
      priority: priority.value,
      status: status.value,
      tags: [],
    });
    setActiveBtn("none");
  };

  return (
    <>
      <div className="h-screen w-screen sm:p-2 lg:p-3 xl:p-4">
        <section className="h-full w-full  sm:border border-gray-400 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden">
          <aside className="hidden lg:flex w-full h-full flex-col items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-purple-50  overflow-hidden relative p-8">
            <div className="absolute inset-0 opacity-30 overflow-hidden">
              <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl animate-rotate-slow"></div>
              <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl animate-rotate-slow-reverse"></div>
            </div>

            <a href="/" className="absolute top-6 left-4 z-20">
              <img src="/brand/logo.svg" className="w-auto h-5" alt="Logo" />
            </a>

            <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center max-w-sm">
              <img
                src="/imgs/chore-list.svg"
                alt="Task planning illustration"
                className="max-w-xs drop-shadow-lg"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Stay focused & organized
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Break down your goals into actionable tasks. Set priorities,
                  track progress, and achieve more.
                </p>
              </div>
            </div>
          </aside>
          <main className="w-full h-full p-1 sm:p-2 lg:p-3 xl:p-4  grid grid-cols-1 grid-rows-[40px_auto] gap-4">
            <nav className="grid grid-cols-[40px_auto_40px] items-center gap-2">
              <button
                onClick={() => {
                  nav(-1);
                }}
                className="aspect-square h-8 overflow-hidden rounded-full hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold">New Task</h1>
            </nav>
            <div className="w-full h-full">
              <div className="w-full h-full py-8 flex flex-col gap-4 overflow-y-auto px-2 max-w-lg mx-auto">
                <Input
                  placeholder="e.g. Finish React TaskBoard UI"
                  label="Title"
                  required
                  value={taskData.title}
                  onChange={(e) => {
                    setTaskData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
                <Input
                  placeholder="Add more details about this task..."
                  label="Description"
                  Type="text-area"
                  required
                  value={taskData.description}
                  onChange={(e) => {
                    setTaskData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
                <div className="grid grid-cols-2 gap-3 h-16">
                  <div className="w-full h-full grid grid-cols-1 grid-rows-[20px_auto] gap-1">
                    <label className="text-sm font-medium">Due Date</label>
                    <input
                      required
                      value={toInputDate(taskData.dueAt)}
                      type="date"
                      onChange={(e) => {
                        setTaskData((prev) => ({
                          ...prev,
                          dueAt: new Date(e.target.value).toISOString(),
                        }));
                      }}
                      className="w-full  text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors"
                    />
                  </div>
                  <Select
                    status={priority}
                    selectActions={priorityActions}
                    statuses={priorities}
                    label={"Priority"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 h-16">
                  <Select
                    status={status}
                    selectActions={statusActions}
                    statuses={statuses}
                    label="Status"
                  />
                </div>
                <Input
                  placeholder="e.g. react, assignment"
                  label="Tags"
                  required
                  value={taskData.tags.join(", ")}
                  onChange={(e) => {
                    setTaskData((prev) => ({
                      ...prev,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    }));
                  }}
                  children={
                    <p className="text-[11px] text-gray-500">
                      Separate tags with commas.
                    </p>
                  }
                />
                <div className="flex items-center my-2 justify-end text-sm gap-4">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-100  hover:bg-gray-100 bg-transparent border border-gray-400 flex items-center justify-center cursor-pointer"
                  >
                    clear All
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-900 active:text-white  hover:bg-gray-900 hover:text-white border border-gray-400 hover:border-gray-900 bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default NewTask;
