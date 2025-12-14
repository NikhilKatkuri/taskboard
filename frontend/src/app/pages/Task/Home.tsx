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
    <div className="h-screen w-full relative">
      <Navbar filter={filterView} Sort={sortView} />
      <section
        className={`h-[calc(100vh-4rem)] w-full max-w-2xl px-2 sm:px-4   flex flex-col items-center justify-center pb-3  mx-auto relative`}
      >
        <div className="h-full w-full max-w-2xl scroll-smooth overflow-y-scroll no-scrollbar">
          {!(data && data.length > 0) ? (
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
              <img
                src="/imgs/no-task.svg"
                className="aspect-square max-w-64 md:max-w-80  xxl:max-w-md"
              />
              <p className="text-gray-500 text-sm font-medium">
                No tasks found.
              </p>
              <p className="text-gray-500 text-xs max-w-72 text-center">
                Click “Create Task” to add your first task and get started.
              </p>
              <button
                onClick={() => {
                  nav("/new");
                }}
                className="px-4  text-center text-sm font-medium space-x-2 h-10 overflow-hidden rounded-full hover:bg-gray-900 bg-gray-100 hover:text-white flex items-center justify-center cursor-pointer"
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
            <div className="w-full h-full grid grid-cols-1 max-w-2xl  mx-auto gap-2 py-3">
              {viewData(data).map((taskItem) => {
                return (
                  <TaskCard
                    key={taskItem._id}
                    task={taskItem}
                    onDelete={handleTaskDelete}
                  />
                );
              })}
              <div className="h-16 "></div>
            </div>
          )}
        </div>
        <Panigation />
        <div className="flex flex-col sm:hidden gap-3 absolute right-4 sm:-right-3 md:-right-10  bottom-24">
          <button
            onClick={() => {
              sortView.setShow((prev) => !prev);
            }}
            className=" h-11 aspect-square  z-10 rounded-full hover:bg-blue-600 bg-blue-500 text-white flex items-center justify-center cursor-pointer shadow-lg shadow-blue-300/80"
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
            className=" h-11 aspect-square  z-10 rounded-full hover:bg-blue-600 bg-blue-500 text-white flex items-center justify-center cursor-pointer shadow-lg shadow-blue-300/80"
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
