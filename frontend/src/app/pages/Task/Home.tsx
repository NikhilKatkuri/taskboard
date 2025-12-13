import Navbar from "@components/reusable/Navbar.task";
import { useNavigate } from "react-router-dom";
import TaskCard from "@components/reusable/TaskCard";
import useTask from "@context/task/useTask";
import Panigation from "@components/reusable/Panigation";
import SearchBox from "@components/reusable/SearchBox";

const Home = () => {
  const nav = useNavigate();
  const { viewData, Tasks: data } = useTask();

  return (
    <div className="h-screen w-full relative">
      <Navbar />
      <section
        className={`h-[calc(100vh-4rem)] w-full px-2 sm:px-4 overflow-hidden flex flex-col items-center justify-center pb-3 max-w-6xl mx-auto relative`}
      >
        <div className="h-full w-full scroll-smooth overflow-y-scroll no-scrollbar">
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
              {viewData(data).map((taskItem, index) => {
                return <TaskCard key={index} task={taskItem} />;
              })}
              <div className="h-16 "></div>
            </div>
          )}
        </div>
        <Panigation />
      </section>

      <SearchBox />
    </div>
  );
};

export default Home;
