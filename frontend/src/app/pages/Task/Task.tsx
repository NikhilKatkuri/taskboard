import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@components/reusable/Input";
import Select from "@components/reusable/Select";
import type { task } from "@schemas/task/Task";
import SkeletonLoader from "@components/reusable/SkeletonLoader";
import useTask from "@context/task/useTask";
import type { Priority } from "@schemas/task/priority";
import type { Status } from "@schemas/task/status";
import useDropDown from "@hooks/useDropDown";
import { toInputDate } from "@utils/index";
import { usehandleTask } from "@hooks/usehandleTask";
import { useAuth } from "@context/auth/useAuth";

interface NavStateChangeProps {
  canGoBack: () => boolean;
  canGoNext: () => boolean;
  goPrev: () => void;
  goNext: () => void;
}

const Task = () => {
  const nav = useNavigate();
  const {
    Task: data,
    setTask: setData,
    priorities,
    statuses,
    caches,
  } = useTask();

  const [priority, priorityActions] = useDropDown<Priority>(priorities[1]);
  const [status, statusActions] = useDropDown<Status>(statuses[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const params = useParams();
  const { token } = useAuth();
  const taskHandler = token ? usehandleTask(token) : null;

  useEffect(() => {
    const fetchTask = () => {
      const taskId = params.taskId;

      if (!token || caches.length === 0) {
        setLoading(true);
        return;
      }

      const index = caches.findIndex((taskItem) => taskItem._id === taskId);

      if (index === -1) {
        setLoading(false);
        nav("/");
        return;
      }

      setCurrentIndex(index);
      setData(caches[index]);
      priorityActions.setLabel(caches[index].priority as Priority);
      priorityActions.setValue(caches[index].priority as Priority);
      statusActions.setLabel(caches[index].status as Status);
      statusActions.setValue(caches[index].status as Status);
      setLoading(false);
    };
    fetchTask();
  }, [params, nav, setData, priorityActions, statusActions, caches, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }) as task);
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

  const navStateChange = (): NavStateChangeProps => {
    return {
      canGoBack: () => currentIndex > 0,
      canGoNext: () => currentIndex < caches.length - 1,
      goPrev: () => {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          nav(`/tasks/${caches[prevIndex]._id}`);
        }
      },
      goNext: () => {
        if (currentIndex < caches.length - 1) {
          const nextIndex = currentIndex + 1;
          nav(`/tasks/${caches[nextIndex]._id}`);
        }
      },
    };
  };

  const navActions = navStateChange();

  const handleSubmit = async () => {
    if (!data || !params.taskId || !taskHandler) return;

    try {
      const res = await taskHandler.updateTask(data, params.taskId);
      if (res?.ok) {
        alert("Task updated successfully");
        nav("/");
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("An error occurred while updating the task");
    }
  };

  return (
    <>
      <div className="h-screen w-screen sm:p-2 lg:p-3 xl:p-4">
        <section className="grid h-full w-full grid-cols-1 gap-2 overflow-hidden rounded-xl border-gray-400 sm:border lg:grid-cols-2">
          <aside className="relative hidden h-full w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 p-8 lg:flex">
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="animate-rotate-slow absolute top-10 right-10 h-32 w-32 rounded-full bg-blue-200 blur-3xl"></div>
              <div className="animate-rotate-slow-reverse absolute bottom-20 left-10 h-40 w-40 rounded-full bg-purple-200 blur-3xl"></div>
            </div>

            <a href="/" className="absolute top-6 left-4 z-20">
              <img src="/brand/logo.svg" className="h-5 w-auto" alt="Logo" />
            </a>

            <div className="relative z-10 flex max-w-sm flex-col items-center justify-center gap-6 text-center">
              <img
                src="/imgs/chore-list.svg"
                alt="Task planning illustration"
                className="max-w-xs drop-shadow-lg"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Stay focused & organized
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Break down your goals into actionable tasks. Set priorities,
                  track progress, and achieve more.
                </p>
              </div>
            </div>
          </aside>
          <main className="grid h-full w-full grid-cols-1 grid-rows-[40px_auto] gap-4 p-1 sm:p-2 lg:p-3 xl:p-4">
            <nav className="grid grid-cols-[40px_auto] items-center gap-2">
              <button
                onClick={() => {
                  nav("/");
                }}
                className="flex aspect-square h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 hover:bg-gray-200"
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
              <div className="flex h-full w-full flex-col">
                <div className="mx-auto flex h-auto w-full max-w-lg flex-col gap-4 overflow-y-auto px-2 py-4 max-lg:pt-8 max-lg:pb-6">
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
                  <div className="grid h-16 grid-cols-2 gap-3">
                    <div className="grid h-full w-full grid-cols-1 grid-rows-[20px_auto] gap-1">
                      <label className="text-sm font-medium">Due Date</label>
                      <input
                        type="date"
                        value={toInputDate(data.dueAt)}
                        onChange={(e) => {
                          setData(
                            (prev) =>
                              ({
                                ...prev,
                                dueAt: new Date(e.target.value).toISOString(),
                              }) as task
                          );
                        }}
                        name="dueAt.date"
                        className="w-full rounded-lg border border-gray-400 px-3 py-2.5 text-sm outline-0 transition-colors focus:border-gray-700"
                      />
                    </div>
                    <Select
                      status={priority}
                      selectActions={priorityActions}
                      statuses={priorities}
                      label={"Priority"}
                    />
                  </div>
                  <div className="grid h-16 grid-cols-2 gap-3">
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
                    name="tags"
                    value={data.tags.join(", ")}
                    onChange={(e) => {
                      setData(
                        (prev) =>
                          ({
                            ...prev,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter((tag) => tag.length > 0),
                          }) as task
                      );
                    }}
                    children={
                      <p className="text-[11px] text-gray-500">
                        Separate tags with commas.
                      </p>
                    }
                  />
                  <div className="my-2 flex items-center justify-end gap-4 text-sm">
                    <button className="flex w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-transparent px-5 py-2.5 hover:bg-gray-100 active:bg-gray-100 max-sm:w-1/2">
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-gray-100 px-5 py-2.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white max-sm:w-1/2"
                    >
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
                    className={`flex h-10 w-full scale-90 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-100 px-4 hover:bg-gray-200 ${
                      navActions.canGoBack()
                        ? ""
                        : "cursor-not-allowed opacity-50"
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
                    className={`flex h-10 w-full scale-90 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-100 px-4 hover:bg-gray-200 ${
                      navActions.canGoNext()
                        ? ""
                        : "cursor-not-allowed opacity-50"
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
              <div className="h-full w-full">
                <div className="mx-auto flex h-full w-full max-w-lg flex-col gap-4 overflow-y-auto px-2 py-8">
                  <div className="grid w-full grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                    <label className="text-sm font-medium">Title</label>
                    <SkeletonLoader />
                  </div>
                  <div className="grid w-full grid-cols-1 grid-rows-[16px_100px] items-start gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <SkeletonLoader />
                  </div>
                  <div className="grid h-16 grid-cols-2 gap-3">
                    <div className="grid w-full grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <SkeletonLoader />
                    </div>
                    <div className="grid w-full grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Priority</label>
                      <SkeletonLoader />
                    </div>
                  </div>
                  <div className="grid h-16 grid-cols-2 gap-3">
                    <div className="grid w-full grid-cols-1 grid-rows-[16px_44px] items-start gap-2">
                      <label className="text-sm font-medium">Status</label>
                      <SkeletonLoader />
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-1 grid-rows-[16px_44px_16px] items-start gap-2">
                    <label className="text-sm font-medium">Tags</label>
                    <SkeletonLoader />
                    <p className="text-[11px] text-gray-500">
                      Separate tags with commas.
                    </p>
                  </div>
                  <div className="my-2 flex items-center justify-end gap-4 text-sm">
                    <button className="flex w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-transparent px-5 py-2.5 hover:bg-gray-100 active:bg-gray-100 max-sm:w-1/2">
                      Cancel
                    </button>
                    <button className="flex w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-gray-100 px-5 py-2.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white active:bg-gray-900 active:text-white max-sm:w-1/2">
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
