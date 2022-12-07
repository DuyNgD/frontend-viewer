import { FC, memo } from "react";
import { createPortal } from "react-dom";
import Layout from "../../Layouts/Layout";
import "./Modal.css";

const Modal: FC<any> = (props) => {
  return props.isShowing
    ? createPortal(
        <Layout className="modal">
          <div className="modal-content" ref={props.innerRef}>
            <span className="btn-close" onClick={props.handleClose}>
              ×
            </span>
            {props.children}
          </div>
        </Layout>,
        document.getElementById("main")!
      )
    : null;
};

export default memo(Modal);
