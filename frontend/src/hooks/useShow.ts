import type { ShowProps } from "@schemas/index";
import { useEffect, useState } from "react";

export default function useShow(): ShowProps {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        setShow(false);
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return { show, setShow };
}
