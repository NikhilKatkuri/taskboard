import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { status, priority } from "../../../types/task";
import Input from "../../../components/reusable/Input";
import Select from "../../../components/reusable/Select";
import type { task } from "../../../types/task/task";
import { mockTasks } from "../../../assets/mockTask";
import SkeletonLoader from "../../../components/reusable/SkeletonLoader";

const Task = () => {
  const nav = useNavigate();
  const priorities: priority.Priorities[] = ["Low", "Medium", "High"];
  const statuses: status.Status[] = ["todo", "in-progress", "review", "done"];

  const [priority, setPriority] = useState<priority.Priority>({
    label: priorities[1],
    value: priorities[1],
    isOpen: false,
  });

  const [status, setStatus] = useState<status.StatusType>({
    label: statuses[0],
    value: statuses[0],
    isOpen: false,
  });

  const [data, setData] = useState<task | undefined>(undefined);

  const params = useParams();

  useEffect(() => {
    const _Id = params.taskId;
    const id = _Id ? parseInt(_Id) : null;
    console.log("Task ID:", typeof id);
    if (!id) {
      nav("/");
      return;
    }
    // get from backend
    const fetchTask = () => {
      if (id < 0 || id > mockTasks.length) {
        nav("/");
        return;
      }
      setData(mockTasks[id - 1]);
      setPriority((prev) => ({
        ...prev,
        label: mockTasks[id - 1].priority,
        value: mockTasks[id - 1].priority,
        isOpen: false,
      }));
      setStatus((prev) => ({
        ...prev,
        label: mockTasks[id - 1].status,
        value: mockTasks[id - 1].status,
        isOpen: false,
      }));
    };
    setTimeout(() => {
      fetchTask();
    }, 1000);
  }, [params, nav]);

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
            {data ? (
              <div className="w-full h-full">
                <div className="w-full h-full py-8 flex flex-col gap-4 overflow-y-auto px-2 max-w-lg mx-auto">
                  <Input
                    placeholder="e.g. Finish React TaskBoard UI"
                    label="Title"
                    value={data.title}
                  />
                  <Input
                    placeholder="Add more details about this task..."
                    label="Description"
                    Type="text-area"
                    value={data.description}
                  />
                  <div className="grid grid-cols-2 gap-3 h-16">
                    <div className="w-full h-full grid grid-cols-1 grid-rows-[20px_auto] gap-1">
                      <label className="text-sm font-medium">Due Date</label>
                      <input
                        type="date"
                        value={data.dueDate}
                        className="w-full  text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors"
                      />
                    </div>
                    <Select
                      status={priority}
                      setstatus={setPriority}
                      statuses={priorities}
                      label={"Priority"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-16">
                    <Select
                      status={status}
                      setstatus={setStatus}
                      statuses={statuses}
                      label="Status"
                    />
                  </div>
                  <Input
                    placeholder="e.g. react, assignment"
                    label="Tags"
                    value={data.tags.join(", ")}
                    children={
                      <p className="text-[11px] text-gray-500">
                        Separate tags with commas.
                      </p>
                    }
                  />
                  <div className="flex items-center my-2 justify-end text-sm gap-4">
                    <button className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-100  hover:bg-gray-100 bg-transparent border border-gray-400 flex items-center justify-center cursor-pointer">
                      Cancel
                    </button>
                    <button className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-900 active:text-white  hover:bg-gray-900 hover:text-white border border-gray-400 hover:border-gray-900 bg-gray-100 flex items-center justify-center cursor-pointer">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <div className="w-full h-full py-8 flex flex-col gap-4 overflow-y-auto px-2 max-w-lg mx-auto">
                  <div className="w-full  grid grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                    <label className="text-sm font-medium">Title</label>
                    <SkeletonLoader />
                  </div>
                  <div className="w-full  grid grid-cols-1 grid-rows-[16px_100px] items-start gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <SkeletonLoader />
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-16">
                    <div className="w-full  grid grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <SkeletonLoader />
                    </div>
                    <div className="w-full  grid grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Priority</label>
                      <SkeletonLoader />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-16">
                    <div className="w-full  grid grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Status</label>
                      <SkeletonLoader />
                    </div>
                  </div>
                  <div className="w-full  grid grid-cols-1 grid-rows-[16px_44px_16px] items-start gap-2">
                    <label className="text-sm font-medium">Tags</label>
                    <SkeletonLoader />
                    <p className="text-[11px] text-gray-500">
                      Separate tags with commas.
                    </p>
                  </div>
                  <div className="flex items-center my-2 justify-end text-sm gap-4">
                    <button className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-100  hover:bg-gray-100 bg-transparent border border-gray-400 flex items-center justify-center cursor-pointer">
                      Cancel
                    </button>
                    <button className="max-sm:w-1/2 w-36 px-5 py-2.5 overflow-hidden rounded-full active:bg-gray-900 active:text-white  hover:bg-gray-900 hover:text-white border border-gray-400 hover:border-gray-900 bg-gray-100 flex items-center justify-center cursor-pointer">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </section>
      </div>
    </>
  );
};

export default Task;
