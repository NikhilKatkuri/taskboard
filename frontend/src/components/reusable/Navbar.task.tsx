import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import useTask from "@context/task/useTask";
import type { ShowProps } from "@schemas/index";

interface NavbarProps {
  filter: ShowProps;
  Sort: ShowProps;
}

const Navbar = ({ filter, Sort }: NavbarProps) => {
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
            filter.setShow((prev) => !prev);
          }}
          className="aspect-square max-sm:hidden h-10 overflow-hidden rounded-full hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer"
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
            Sort.setShow((prev) => !prev);
          }}
          className="aspect-square max-sm:hidden h-10 overflow-hidden rounded-full hover:bg-gray-200 bg-gray-100 flex items-center justify-center cursor-pointer"
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
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
