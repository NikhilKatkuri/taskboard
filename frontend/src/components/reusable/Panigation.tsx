import useTask from "@context/task/useTask";

const Panigation = () => {
  const { panigation, setPanigation, MaxPagesLength } = useTask();

  if (panigation.totalPage <= 1 || !panigation) {
    return null;
  }
  return (
    <div className=" w-full flex items-center absolute bottom-0 py-3 h-16 bg-linear-90 from-white/80 via-gray/50 to-white/80 max-w-2xl mx-auto justify-center">
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
          } bg-transparent transition-colors md:pr-3`}
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
              panigation.currPage - Math.floor(MaxPagesLength / 2)
            );
            const endPage = Math.min(
              panigation.totalPage,
              startPage + MaxPagesLength
            );
            if (index >= endPage || index < startPage) return null;

            return (
              <li
                onClick={() => {
                  setPanigation((prev) => ({
                    ...prev,
                    currPage: index,
                  }));
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
              currPage: Math.min(prev.currPage + 1, panigation.totalPage - 1),
            }));
          }}
          disabled={panigation.currPage === panigation.totalPage - 1}
          className={`max-sm:aspect-square text-sm h-10 flex items-center font-medium gap-2 justify-center px-2 rounded-lg    bg-transparent transition-colors
                  ${
                    panigation.currPage === panigation.totalPage - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-200/60"
                  } 
                  md:pl-3`}
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
    </div>
  );
};

export default Panigation;
