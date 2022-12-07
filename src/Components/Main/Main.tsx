import { FC, memo } from "react";
import "./Main.css";

const Main: FC<any> = (props) => {
  return <main id={"main"}>{props.children}</main>;
}

export default memo(Main);
