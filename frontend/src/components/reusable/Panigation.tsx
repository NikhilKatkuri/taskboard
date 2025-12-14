import useTask from "@context/task/useTask";

const Panigation = () => {
  const { panigation, setPanigation, MaxPagesLength } = useTask();

  if (panigation.totalPage <= 1 || !panigation) {
    return null;
  }
  return (
    <div className="via-gray/50 absolute bottom-0 mx-auto flex h-16 w-full max-w-2xl items-center justify-center bg-linear-90 from-white/80 to-white/80 py-3">
      <nav className="flex h-10 w-full items-center justify-center gap-1 sm:w-auto sm:max-w-lg">
        <button
          onClick={() => {
            setPanigation((prev) => ({
              ...prev,
              currPage: Math.max(0, prev.currPage - 1),
            }));
          }}
          disabled={panigation.currPage === 0}
          className={`flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium max-sm:aspect-square ${
            panigation.currPage === 0
              ? "cursor-not-allowed opacity-50"
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
        <ul className="flex h-10 w-full items-center justify-center">
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
                className={`mx-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-200/60 ${
                  isActive
                    ? "border border-black/20 font-medium"
                    : "bg-transparent"
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
          className={`flex h-10 items-center justify-center gap-2 rounded-lg bg-transparent px-2 text-sm font-medium transition-colors max-sm:aspect-square ${
            panigation.currPage === panigation.totalPage - 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-200/60"
          } md:pl-3`}
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
