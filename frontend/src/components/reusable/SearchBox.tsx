import useTask from "@context/task/useTask";
import SkeletonLoader from "./SkeletonLoader";
import { useMemo, useState } from "react";
import TaskBox from "./TaskBox";
import type { task } from "@schemas/task/Task";
import useDropDown from "@hooks/useDropDown";
import useDebounce from "@hooks/useDebounce";
import Select from "./Select";

type searchBy = "title" | "description";

const SearchBox = () => {
  const { isSearchBoxOpen, toggleSearchBox, Tasks } = useTask();

  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce(value, 300);

  const searchOption: searchBy[] = ["title", "description"];

  const [searchBy, searchByAction] = useDropDown<searchBy>("title");

  const loading = value !== debouncedValue;

  const filteredTasks = useMemo(() => {
    if (!isSearchBoxOpen) {
      return [];
    }

    if (!debouncedValue) {
      return [...Tasks].reverse();
    }

    const lowerText = debouncedValue.toLowerCase();
    const data: task[] = Tasks.filter((d) => {
      const searchText = d.title.toLowerCase();
      if (searchBy.value === "description") {
        const findDesc = d.description?.toLowerCase() || "";
        return findDesc.startsWith(lowerText) || findDesc.includes(lowerText);
      }
      return searchText.startsWith(lowerText) || searchText.includes(lowerText);
    }).reverse();

    return data;
  }, [isSearchBoxOpen, debouncedValue, Tasks, searchBy.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value.trimStart();
    setValue(text);
  };

  if (!isSearchBoxOpen) return null;

  return (
    <div
      onClick={() => {
        toggleSearchBox();
      }}
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-gray-900/10 px-3 backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="grid h-120 w-full max-w-lg grid-cols-1 grid-rows-[auto_1fr_auto] rounded-xl bg-white xl:max-w-2xl"
      >
        <div className="flex items-center gap-1 border-b border-gray-300 px-3 py-2">
          <div className="flex w-full items-center space-x-2 py-2">
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
        <div className="overflow-hidden p-2 px-3">
          <div className="no-scrollbar flex h-full flex-col gap-2 overflow-y-scroll">
            {loading ? (
              [...Array(6)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className="grid h-12 grid-cols-[auto_24px] gap-1"
                  >
                    <div className="h-12 w-full">
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
            ) : filteredTasks.length > 0 ? (
              <>
                {filteredTasks.map((item) => (
                  <TaskBox key={item._id} task={item} />
                ))}
              </>
            ) : value ? (
              <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                <img
                  src="/imgs/not-found.svg"
                  className="aspect-square max-w-32 md:max-w-48 xl:max-w-56"
                  alt="No tasks found"
                />
                <div>No tasks found for "{value}"</div>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                <img
                  src="/imgs/start-search.svg"
                  className="aspect-square max-w-32 md:max-w-48 xl:max-w-56"
                  alt="No tasks found"
                />
                <div>Start typing to search tasks...</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-16 items-center justify-between px-3">
          <div className="w-48 scale-90">
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
            <span className="bg-linear-120 from-sky-600 to-rose-500 bg-clip-text font-medium text-transparent">
              Nikhil
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
