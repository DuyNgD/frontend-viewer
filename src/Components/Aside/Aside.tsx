import { FC, memo, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Aside.css";

const Aside: FC<any> = (props) => {
  const [DOMReady, setDOMReady] = useState(false);

  useLayoutEffect(() => {
    setDOMReady(true);
  }, []);

  return DOMReady && props.isShowing
    ? createPortal(
        <aside ref={props.innerRef} className={props.left ? "left" : "right"}>
          {props.children}
        </aside>,
        document.getElementById("review-hang-quan") as HTMLElement
      )
    : null;
};

export default memo(Aside);
