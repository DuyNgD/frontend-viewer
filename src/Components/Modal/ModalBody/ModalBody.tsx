import { FC, memo } from "react";
import "./ModalBody.css";

const ModalBody: FC<any> = (props) => {
  return <div className={"modal-body"}>{props.children}</div>;
}

export default memo(ModalBody);
