import usePopMenu from "@hooks/usePopMenu";
import type { ShowProps } from "@schemas/index";
import type { order } from "@schemas/task/Task";
import { useEffect } from "react";

interface PopMenuProps<T> {
  data: T[];
  label: string;
  icon?: React.ReactElement<SVGElement>;
  onChange?: (value: T) => void;
  getOrder?: (option: order) => void;
  visibleState: ShowProps;
}

function PopMenu<T extends string>({
  data: initialValue,
  onChange,
  getOrder,
  label,
  icon: Icon,
  visibleState,
}: PopMenuProps<T>) {
  const data = initialValue as T[];
  const [state, actions] = usePopMenu<T>(data[0]);
  useEffect(() => {
    onChange?.(state.option);
  }, [onChange, state.option]);
  useEffect(() => {
    getOrder?.(state.order);
  }, [getOrder, state.order]);

  if (!visibleState.show) return null;
  return (
    <div
      onClick={() => {
        visibleState.setShow(false);
      }}
      className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black/10 z-20"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-72 h-auto p-4 bg-white rounded-xl shadow-lg"
      >
        <div className="text-lg font-semibold mb-4 flex items-center justify-between gap-2">
          <p className="flex items-center gap-2">
            <span>{Icon}</span>
            {label}
          </p>
          <button
            onClick={() => {
              actions.orderBy(state.order === "asc" ? "desc" : "asc");
            }}
            className={`aspect-square  h-10 overflow-hidden rounded-full hover:bg-gray-900 hover:text-gray-50 active:bg-gray-900 active:text-gray-50 bg-gray-100 flex items-center justify-center cursor-pointer transition-colors duration-200  ${
              state.order === "asc" ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-3">
          {data.map((option, index) => {
            return (
              <li key={index} className="w-full">
                <button
                  onClick={() => {
                    actions.SelectOption(option);
                    visibleState.setShow(false);
                  }}
                  className={`p-2 w-full text-left  rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                    state.option === option
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PopMenu;
