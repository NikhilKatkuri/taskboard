import useTask from "@context/task/useTask";
import SkeletonLoader from "./SkeletonLoader";
import { useEffect, useState } from "react";
import TaskBox from "./TaskBox";
import type { task } from "@schemas/task/Task";
import useDropDown from "@hooks/useDropDown";
import Select from "./Select";

type searchBy = "title" | "description";

const SearchBox = () => {
  const { isSearchBoxOpen, toggleSearchBox, Tasks } = useTask();

  const [loading, setLoading] = useState<boolean>(true);

  const [filteredTasks, setFilteredTasks] = useState<task[]>([]);

  const [value, setValue] = useState<string>("");

  const searchOption: searchBy[] = ["title", "description"];

  const [searchBy, searchByAction] = useDropDown<searchBy>("title");

  useEffect(() => {
    const state = () => {
      if (isSearchBoxOpen) {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
        setFilteredTasks([...Tasks].reverse());
      } else {
        setFilteredTasks([]);
      }
    };
    state();
  }, [isSearchBoxOpen, Tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value.trimStart();
    setValue(text);
    if (!text) {
      setFilteredTasks([...Tasks].reverse());
      return;
    }
    const data: task[] = filteredTasks.filter((d) => {
      const findText = d.title.toLowerCase();
      const lowerText = text.toLowerCase();
      if (searchBy.value === "description") {
        const findDesc = d.description?.toLowerCase() || "";
        return findDesc.startsWith(lowerText) || findDesc.includes(lowerText);
      }
      return findText.startsWith(lowerText) || findText.includes(lowerText);
    });
    if (!data.length) {
      console.log("empty");
    }

    setFilteredTasks(data);
  };

  if (!isSearchBoxOpen) return null;

  return (
    <div
      onClick={() => {
        toggleSearchBox();
      }}
      className="fixed top-0 left-0 h-screen w-screen bg-gray-900/10 flex items-center justify-center px-3 z-20 backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full max-w-lg xl:max-w-2xl h-120  bg-white rounded-xl   grid grid-cols-1 grid-rows-[auto_1fr_auto] "
      >
        <div className="flex items-center gap-1 border-b border-gray-300 px-3 py-2">
          <div className="flex items-center py-2 space-x-2 w-full">
            <span>
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="w-full outline-0"
              placeholder="Search tasks..."
            />
          </div>
          <div className=""></div>
        </div>
        <div className="p-2 px-3 overflow-hidden">
          <div className="flex flex-col gap-2 h-full overflow-y-scroll no-scrollbar">
            {loading || !filteredTasks.length ? (
              [...Array(6)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[auto_24px] gap-1 h-10"
                  >
                    <div className="w-full h-10">
                      <SkeletonLoader />
                    </div>
                    <button className="flex items-center justify-center">
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
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                {filteredTasks.map((item) => (
                  <TaskBox key={item.id} task={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="h-16 flex items-center justify-between px-3">
          <div className="w-48 scale-90 ">
            <Select
              status={searchBy}
              label={searchOption[0]}
              statuses={searchOption}
              selectActions={searchByAction}
              showLabel={false}
            />
          </div>
          <p className="text-center">
            <span className="text-xs">Search by</span>{" "}
            <span className="font-medium bg-linear-120 from-sky-600 to-rose-500 bg-clip-text text-transparent">
              Nikhil
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
