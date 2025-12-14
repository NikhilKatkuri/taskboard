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
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black/10"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-auto w-72 rounded-xl bg-white p-4 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between gap-2 text-lg font-semibold">
          <p className="flex items-center gap-2">
            <span>{Icon}</span>
            {label}
          </p>
          <button
            onClick={() => {
              actions.orderBy(state.order === "asc" ? "desc" : "asc");
            }}
            className={`flex aspect-square h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 transition-colors duration-200 hover:bg-gray-900 hover:text-gray-50 active:bg-gray-900 active:text-gray-50 ${
              state.order === "asc" ? "rotate-0" : "rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
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
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left transition-colors duration-200 ${
                    state.option === option
                      ? "bg-blue-100 font-medium text-blue-600"
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
