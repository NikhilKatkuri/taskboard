import { useEffect, useState } from "react";
import Navbar from "../../../components/reusable/Navbar.task";
import SkeletonLoader from "../../../components/reusable/SkeletonLoader";

interface Panigation {
  currPage: number;
  totalPage: number;
}
const Home = () => {
  const MaxPages = 5;
  const [panigation, setPanigation] = useState<Panigation>({
    currPage: 0,
    totalPage: 50,
  });
  const [isSearchBoxOpen, setisSearchBoxOpen] = useState<boolean>(false);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setisSearchBoxOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-full relative">
      <Navbar setisSearchBoxOpen={setisSearchBoxOpen} />
      <section className="h-[calc(100vh-4rem)] w-full px-2 sm:px-4 overflow-hidden grid grid-rows-[auto_40px] pb-3 max-w-6xl mx-auto">
        <div className="h-full w-full  overflow-y-scroll no-scrollbar"></div>
        <div className="h-10 w-full flex items-center justify-center">
          {panigation.totalPage > 1 && (
            <nav className="w-full sm:w-auto h-10  flex  items-center justify-center gap-1 sm:max-w-lg">
              <button
                onClick={() => {
                  setPanigation((prev) => ({
                    ...prev,
                    currPage: Math.max(0, prev.currPage - 1),
                  }));
                }}
                disabled={panigation.currPage === 0}
                className={`max-sm:aspect-square text-sm h-10 flex items-center font-medium gap-2 px-2 rounded-lg  ${
                  panigation.currPage === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-200/60"
                } bg-transparent transition-colors`}
              >
                <span>
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
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
                <p className="max-sm:hidden">Previous</p>
              </button>
              <ul className=" h-10 w-full flex items-center justify-center">
                {[...Array(panigation.totalPage)].map((_, index) => {
                  const isActive = index === panigation.currPage;
                  const startPage = Math.max(
                    0,
                    panigation.currPage - Math.floor(MaxPages / 2)
                  );
                  const endPage = Math.min(
                    panigation.totalPage,
                    startPage + MaxPages
                  );
                  if (index >= endPage || index < startPage) return null;

                  return (
                    <li
                      onClick={() => {
                        setPanigation((prev) => ({ ...prev, currPage: index }));
                      }}
                      key={index}
                      className={`h-8 w-8 flex items-center text-gray-700 justify-center mx-1 rounded-lg cursor-pointer hover:bg-gray-200/60 transition-colors ${
                        isActive
                          ? "border border-black/20 font-medium"
                          : "bg-transparent "
                      }`}
                    >
                      {index + 1}
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => {
                  setPanigation((prev) => ({
                    ...prev,
                    currPage: Math.min(
                      prev.currPage + 1,
                      panigation.totalPage - 1
                    ),
                  }));
                }}
                disabled={panigation.currPage === panigation.totalPage - 1}
                className={`max-sm:aspect-square text-sm h-10 flex items-center font-medium gap-2 justify-center px-2 rounded-lg    bg-transparent transition-colors
                  ${
                    panigation.currPage === panigation.totalPage - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-200/60"
                  } 
                  `}
              >
                <p className="max-sm:hidden">Next</p>
                <span>
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </button>
            </nav>
          )}
        </div>
      </section>
      {isSearchBoxOpen && (
        <div
          onClick={() => {
            setisSearchBoxOpen(!isSearchBoxOpen);
          }}
          className="fixed top-0 left-0 h-screen w-screen bg-gray-900/10 flex items-center justify-center px-3 z-20 backdrop-blur-sm"
        >
          <div
            onClick={() => {}}
            className="w-full max-w-lg xl:max-w-2xl h-120  bg-white rounded-xl overflow-hidden  grid grid-cols-1 grid-rows-[auto_1fr_auto] "
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
                  className="w-full outline-0"
                  placeholder="Search tasks..."
                />
              </div>
              <div className=""></div>
            </div>
            <div className="p-2 px-3 overflow-hidden">
              <div className="flex flex-col gap-2 h-full overflow-y-scroll no-scrollbar">
                {[...Array(6)].map((_, index) => {
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
                })}
              </div>
            </div>
            <div className="h-10 flex items-center justify-end px-3">
              <p className="text-center">
                <span className="text-xs">Search by</span>{" "}
                <span className="font-medium bg-linear-120 from-sky-600 to-rose-500 bg-clip-text text-transparent">
                  Nikhil
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
