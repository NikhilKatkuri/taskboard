import { useState } from "react";

interface DropDownOption<T> {
  label: T;
  value: T;
  isOpen: boolean;
}

export default function useDropDown<T>(initialValue: T): [
  DropDownOption<T>,
  {
    setLabel: (label: T) => void;
    setValue: (value: T) => void;
    setIsOpen: (isOpen: boolean) => void;
    toggleOpen: () => void;
  },
] {
  const [state, setState] = useState<DropDownOption<T>>({
    label: initialValue,
    value: initialValue,
    isOpen: false,
  });

  return [
    state,
    {
      setLabel: (label) => setState((prev) => ({ ...prev, label })),
      setValue: (value) => setState((prev) => ({ ...prev, value })),
      setIsOpen: (isOpen) => setState((prev) => ({ ...prev, isOpen })),
      toggleOpen: () => setState((prev) => ({ ...prev, isOpen: !prev.isOpen })),
    },
  ];
}
