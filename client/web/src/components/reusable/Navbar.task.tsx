import { useNavigate } from "react-router-dom";
import useTask from "@context/task/useTask";
import type { ShowProps } from "@schemas/index";
import { useAuth } from "@context/auth/useAuth";
import useShow from "@hooks/useShow";
import { useEffect, useRef } from "react";

interface NavbarProps {
  filter: ShowProps;
  Sort: ShowProps;
}

const Navbar = ({ filter, Sort }: NavbarProps) => {
  const nav = useNavigate();
  const { toggleSearchBox } = useTask();
  const { user, logout } = useAuth();
  const profileMenu = useShow();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        profileMenu.setShow(false);
      }
    };

    if (profileMenu.show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenu]);

  const handleLogout = () => {
    logout();
    profileMenu.setShow(false);
    nav("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-white px-4">
      <div className="flex items-center gap-4">
        <a href="/" className="">
          <img
            src="/brand/logo.svg"
            className="h-5 w-auto max-[440px]:hidden"
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
          className="flex aspect-square h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 hover:bg-gray-200 max-sm:hidden"
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
          className="flex aspect-square h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 hover:bg-gray-200 max-sm:hidden"
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
          className="flex aspect-square h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 hover:bg-gray-200"
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
          className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-center text-sm font-medium hover:bg-gray-900 hover:text-white max-[440px]:aspect-square max-[440px]:px-2 min-[440px]:space-x-2 min-[440px]:px-4"
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
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => profileMenu.setShow((prev) => !prev)}
            className="flex aspect-square h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-500 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            {user ? getInitials(user.fullName) : "U"}
          </button>

          {profileMenu.show && (
            <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <div className="border-b border-gray-200 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.fullName || "User"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
