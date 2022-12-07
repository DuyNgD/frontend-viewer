import { FC, memo } from "react";
import "./Dropdown.css";

const Dropdown: FC<any> = (props) => {
  return (
    <div className="dropdown">
      {props.render}
      <div className="dropdown-content">{props.children}</div>
    </div>
  );
};

export default memo(Dropdown);
