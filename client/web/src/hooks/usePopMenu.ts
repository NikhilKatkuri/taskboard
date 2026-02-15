import type { order } from "@schemas/task/Task";
import { useState } from "react";

interface PopMenuOption<T> {
  order: order;
  option: T;
}

export default function usePopMenu<T>(initialValue: T): [
  PopMenuOption<T>,
  {
    orderBy: (order: order) => void;
    SelectOption: (option: T) => void;
  },
] {
  const [state, setState] = useState<PopMenuOption<T>>({
    order: "asc",
    option: initialValue,
  });
  return [
    state,
    {
      orderBy: (order: order) => setState((prev) => ({ ...prev, order })),
      SelectOption: (option: T) => setState((prev) => ({ ...prev, option })),
    },
  ];
}
