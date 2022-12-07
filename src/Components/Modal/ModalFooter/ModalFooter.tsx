import { FC, memo } from "react";
import "./ModalFooter.css";

const ModalFooter: FC<any> = (props) => {
  return <div className={"modal-footer"}>{props.children}</div>;
}

export default memo(ModalFooter);
