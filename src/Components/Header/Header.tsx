import { FC, memo } from "react";
import "./Header.css";

const Header: FC<any> = (props) => {
  return <header>{props.children}</header>;
};

export default memo(Header);
