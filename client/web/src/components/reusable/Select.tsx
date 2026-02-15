interface statusType<T> {
  label: T;
  value: T;
  isOpen: boolean;
}

interface SelectProps<T> {
  status: statusType<T>;
  statuses: T[];
  label: string;
  selectActions: {
    setLabel: (label: T) => void;
    setValue: (value: T) => void;
    setIsOpen: (isOpen: boolean) => void;
    toggleOpen: () => void;
  };
  showLabel?: boolean;
}

function Select<T extends string>({
  status,
  statuses,
  label,
  selectActions,
  showLabel = true,
}: SelectProps<T>) {
  return (
    <div
      className={`h-full w-full ${
        showLabel ? "grid grid-cols-1 grid-rows-[20px_auto]" : ""
      } gap-1`}
    >
      {showLabel && (
        <label className="cursor-pointer text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        <button
          onClick={() => {
            selectActions.toggleOpen();
          }}
          className="flex h-auto w-full cursor-pointer items-center justify-between rounded-lg border border-gray-400 px-3 py-2.5 text-sm outline-0 transition-colors hover:bg-gray-100 focus:border-gray-700"
        >
          <p>{status.label.charAt(0).toUpperCase() + status.label.slice(1)}</p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
        {status.isOpen && (
          <div className="absolute top-[110%] left-0 z-10 flex h-auto w-full flex-col rounded-lg bg-gray-50 p-3 shadow-sm max-sm:w-72">
            {statuses.map((status, index) => (
              <button
                key={index}
                className="grid w-full grid-cols-[36px_auto] items-center gap-2 rounded-lg p-3 hover:bg-gray-100"
                onClick={() => {
                  selectActions.setLabel(status);
                  selectActions.setValue(status);
                  selectActions.toggleOpen();
                }}
              >
                <div className="h-4 w-4 rounded-full bg-green-500/30" />
                <p className="text-left text-sm">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
