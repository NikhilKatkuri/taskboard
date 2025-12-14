import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@components/reusable/Input";
import Select from "@components/reusable/Select";
import type { task } from "@schemas/task/Task";
import { mockTasks } from "@assets/mockTask";
import SkeletonLoader from "@components/reusable/SkeletonLoader";
import useTask from "@context/task/useTask";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";
import useDropDown from "@hooks/useDropDown";

interface NavProps {
  prev: number;
  next: number;
  curr: number;
}

interface navStateChangeProps {
  canGoBack: () => boolean;
  canGoNext: () => boolean;
  goPrev: () => void;
  goNext: () => void;
}

const Task = () => {
  const nav = useNavigate();
  const { Task: data, setTask: setData, priorities, statuses } = useTask();

  const [priority, priorityActions] = useDropDown<Priority>(priorities[1]);
  const [status, statusActions] = useDropDown<Status>(statuses[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  const [navState, setNavState] = useState<NavProps>({
    prev: 0,
    next: 0,
    curr: 0,
  });

  useEffect(() => {
    // get from backend
    const fetchTask = () => {
      setLoading(true);
      const _Id = params.taskId;
      const id = _Id ? parseInt(_Id) : null;

      if (!id) {
        nav("/");
        return;
      }

      if (id < 0 || id > mockTasks.length) {
        nav("/");
        return;
      }

      setNavState({
        prev: id - 1 < 1 ? 1 : id - 1,
        next: id + 1 > mockTasks.length ? mockTasks.length : id + 1,
        curr: id,
      });

      setData(mockTasks[id - 1]);

      priorityActions.setLabel(mockTasks[id - 1].priority);
      priorityActions.setValue(mockTasks[id - 1].priority);
      priorityActions.setIsOpen(false);

      statusActions.setLabel(mockTasks[id - 1].status);
      statusActions.setValue(mockTasks[id - 1].status);
      statusActions.setIsOpen(false);
      setLoading(false);
    };
    fetchTask();
  }, [params, nav, setData, priorityActions, statusActions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value } as task));
  };

  useEffect(() => {
    function updateData() {
      setData((prev) =>
        prev
          ? ({
              ...prev,
              priority: priority.label,
              status: status.label,
            } as task)
          : prev
      );
    }
    updateData();
  }, [priority.label, status.label, setData]);

  function navStateChange(): navStateChangeProps {
    return {
      canGoBack: () => {
        if (navState.curr > 1) {
          return true;
        }
        return false;
      },
      canGoNext: () => {
        if (navState.curr < mockTasks.length) {
          return true;
        }
        return false;
      },
      goPrev: () => {
        if (navState.curr > 1) {
          nav(`/tasks/${navState.prev}`);
        }
      },
      goNext: () => {
        if (navState.curr < mockTasks.length) {
          nav(`/tasks/${navState.next}`);
        }
      },
    };
  }

  const navActions = navStateChange();
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
            <nav className="grid grid-cols-[40px_auto] items-center gap-2">
              <button
                onClick={() => {
                  nav("/");
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
            {data && !loading ? (
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-auto  max-lg:pb-6 max-lg:pt-8 py-4 flex flex-col gap-4 overflow-y-auto px-2 max-w-lg mx-auto">
                  <Input
                    placeholder="e.g. Finish React TaskBoard UI"
                    label="Title"
                    onChange={handleChange}
                    value={data.title}
                    name="title"
                  />
                  <Input
                    placeholder="Add more details about this task..."
                    label="Description"
                    Type="text-area"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-3 h-16">
                    <div className="w-full h-full grid grid-cols-1 grid-rows-[20px_auto] gap-1">
                      <label className="text-sm font-medium">Due Date</label>
                      <input
                        type="date"
                        value={data.dueAt.date}
                        onChange={(e) => {
                          setData(
                            (prev) =>
                              ({
                                ...prev,
                                dueAt: { ...prev?.dueAt, date: e.target.value },
                              } as task)
                          );
                        }}
                        name="dueAt.date"
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
                <nav className="grid grid-cols-[100px_auto_100px] px-2">
                  <button
                    onClick={() => {
                      navActions.goPrev();
                    }}
                    disabled={!navActions.canGoBack()}
                    className={`h-10 scale-90 px-4 w-full gap-2 overflow-hidden rounded-xl hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer ${
                      navActions.canGoBack()
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span className="text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                      </svg>
                    </span>
                    <span>Prev</span>
                  </button>
                  <div className="" />
                  <button
                    onClick={() => {
                      navActions.goNext();
                    }}
                    disabled={!navActions.canGoNext()}
                    className={`h-10 scale-90 px-4 w-full gap-2 overflow-hidden rounded-xl hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer  ${
                      navActions.canGoNext()
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span>Next</span>
                    <span className="text-sm text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </button>
                </nav>
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
