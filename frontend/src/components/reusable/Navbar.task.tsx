import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import useTask from "@context/task/useTask";

const Navbar = () => {
  const nav = useNavigate();
  const { toggleSearchBox } = useTask();

  return (
    <header className="w-full sticky top-0 z-10 h-16 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <a href="/" className="">
          <img
            src="/brand/logo.svg"
            className="w-auto h-5 max-[440px]:hidden"
          />
          <img
            src="/brand/icon.svg"
            className="aspect-square size-10 min-[440px]:hidden"
          />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            toggleSearchBox();
          }}
          className="aspect-square h-10 overflow-hidden rounded-full hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer"
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            nav("/new");
          }}
          className="max-[440px]:aspect-square max-[440px]:px-2 min-[440px]:px-4  text-center text-sm font-medium min-[440px]:space-x-2 h-10 overflow-hidden rounded-full hover:bg-gray-900 bg-gray-100 hover:text-white flex items-center justify-center cursor-pointer"
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
          <span className="max-[440px]:hidden">New</span>
        </button>
        <button className="aspect-square h-10 overflow-hidden rounded-full hover:bg-gray-50 border border-gray-50 flex items-center justify-center cursor-pointer">
          <SkeletonLoader className="h-10 w-10 rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
