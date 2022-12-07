import { FC, memo } from "react";
import "./Footer.css";

const Footer: FC<any> = (props) => {
  return <footer>{props.children}</footer>;
};

export default memo(Footer);
