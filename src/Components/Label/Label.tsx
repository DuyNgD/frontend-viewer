import { FC, memo } from "react";
import "./Label.css";

const Label: FC<any> = (props) => {
  return (
    <label className={"label"} {...props}>
      {props.children}
    </label>
  );
};

export default memo(Label);
