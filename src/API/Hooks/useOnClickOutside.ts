import { useLayoutEffect } from "react";

export const useOnClickOutside: Function = (
  ref: HTMLElement,
  isShowing: Boolean,
  handler: Function
) => {
  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || ref.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, isShowing, handler]);
};
