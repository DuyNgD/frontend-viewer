import { FC, memo } from "react";
import "./Badget.css";

const Badget: FC<any> = (props) => {
  return <span className="badget">{props.children}</span>;
};

export default memo(Badget);
