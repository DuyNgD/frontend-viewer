import { FC, memo } from "react";
import "./Layout.css";

const Layout: FC<any> = (props) => {
  return <section className={props.className}>{props.children}</section>;
};

export default memo(Layout);
