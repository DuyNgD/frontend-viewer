import { FC, memo } from "react";
import "./ModalHeader.css";

const ModalHeader: FC<any> = (props) => {
  return <div className={"modal-header"}>{props.children}</div>;
};

export default memo(ModalHeader);
