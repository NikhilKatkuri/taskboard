import Navbar from "@components/reusable/Navbar.task";
import { useNavigate } from "react-router-dom";
import TaskCard from "@components/reusable/TaskCard";
import useTask from "@context/task/useTask";
import Panigation from "@components/reusable/Panigation";
import SearchBox from "@components/reusable/SearchBox";
import PopMenu from "@components/reusable/SortList";
import useShow from "@hooks/useShow";
import type { FilterOption, order, SortOption } from "@schemas/task/Task";

const Home = () => {
  const nav = useNavigate();
  const {
    viewData,
    Tasks: data,
    list,
    setFilterOption,
    setSortOption,
    setSortOrder,
    refreshTasks,
  } = useTask();

  const handleTaskDelete = async () => {
    await refreshTasks();
  };

  const sortView = useShow();
  const filterView = useShow();

  function handleSortChange(value: SortOption) {
    setSortOption(value);
  }

  function handleOrderChange(value: order) {
    setSortOrder(value);
  }

  function handleFilterChange(value: FilterOption) {
    setFilterOption(value);
  }
  return (
    <div className="relative h-screen w-full">
      <Navbar filter={filterView} Sort={sortView} />
      <section
        className={`relative mx-auto flex h-[calc(100vh-4rem)] w-full max-w-2xl flex-col items-center justify-center px-2 pb-3 sm:px-4`}
      >
        <div className="no-scrollbar h-full w-full max-w-2xl overflow-y-scroll scroll-smooth">
          {!(data && data.length > 0) ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <img
                src="/imgs/no-task.svg"
                className="xxl:max-w-md aspect-square max-w-64 md:max-w-80"
              />
              <p className="text-sm font-medium text-gray-500">
                No tasks found.
              </p>
              <p className="max-w-72 text-center text-xs text-gray-500">
                Click “Create Task” to add your first task and get started.
              </p>
              <button
                onClick={() => {
                  nav("/new");
                }}
                className="flex h-10 cursor-pointer items-center justify-center space-x-2 overflow-hidden rounded-full bg-gray-100 px-4 text-center text-sm font-medium hover:bg-gray-900 hover:text-white"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="">Create Task</span>
              </button>
            </div>
          ) : (
            <div className="mx-auto grid h-full w-full max-w-2xl grid-cols-1 gap-2 py-3">
              {viewData(data).map((taskItem) => {
                return (
                  <TaskCard
                    key={taskItem._id}
                    task={taskItem}
                    onDelete={handleTaskDelete}
                  />
                );
              })}
              <div className="h-16"></div>
            </div>
          )}
        </div>
        <Panigation />
        <div className="absolute right-4 bottom-24 flex flex-col gap-3 sm:-right-3 sm:hidden md:-right-10">
          <button
            onClick={() => {
              sortView.setShow((prev) => !prev);
            }}
            className="z-10 flex aspect-square h-11 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-300/80 hover:bg-blue-600"
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
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              filterView.setShow((prev) => !prev);
            }}
            className="z-10 flex aspect-square h-11 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-300/80 hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
        </div>
      </section>

      <SearchBox />

      <PopMenu
        visibleState={sortView}
        label="Sort By"
        icon={
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        }
        data={list.sort}
        onChange={handleSortChange}
        getOrder={handleOrderChange}
      />

      <PopMenu
        visibleState={filterView}
        label="Filter"
        icon={
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        }
        data={list.filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Home;
