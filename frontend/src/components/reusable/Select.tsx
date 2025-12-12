interface statusType<T> {
  label: T;
  value: T;
  isOpen: boolean;
}

interface SelectProps<T> {
  status: statusType<T>;
  setstatus: React.Dispatch<React.SetStateAction<statusType<T>>>;
  statuses: T[];
  label: string;
}

const Select = <T extends string>({
  status,
  setstatus,
  statuses,
  label,
}: SelectProps<T>) => {
  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-[20px_auto] gap-1">
      <label className="text-sm font-medium cursor-pointer">{label}</label>
      <div className="relative">
        <button
          onClick={() => {
            setstatus((prev) => ({ ...prev, isOpen: true }));
          }}
          className="flex items-center justify-between w-full h-auto text-sm py-2.5 rounded-lg border outline-0 px-3 border-gray-400 focus:border-gray-700 transition-colors hover:bg-gray-100 cursor-pointer"
        >
          <p>{status.label}</p>
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
          <div className="flex flex-col absolute top-[110%] max-sm:w-72 w-full left-0 h-auto z-10  bg-gray-50  shadow-sm  rounded-lg p-3">
            {statuses.map((status, index) => (
              <button
                key={index}
                className="grid grid-cols-[36px_auto] gap-2 items-center w-full p-3 rounded-lg hover:bg-gray-100"
                onClick={() =>
                  setstatus({
                    label: status,
                    value: status,
                    isOpen: false,
                  })
                }
              >
                <div className="h-4 w-4 rounded-full bg-green-500/30 " />
                <p className="text-sm text-left">{status}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
