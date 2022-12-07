import { useState } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

export const useShowing: Function = (initialMode: Boolean = false) => {
  const [isShowing, setIsShowing] = useState<Boolean>(initialMode);
  const [innerRef, setInnerRef] = useState<HTMLElement | null>(null);

  const toggle = () => setIsShowing(!isShowing);

  const useRef = (ref: HTMLElement | null) => setInnerRef(ref);

  useOnClickOutside(innerRef, isShowing, toggle);

  return [isShowing, toggle, useRef];
};
