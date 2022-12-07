import { FC, memo } from "react";
import Article from "../../../Components/Article/Article";
import "./FooterLayout.css";

const FooterLayout: FC<any> = () => {
  return <Article className={"footer-layout"}></Article>;
};

export default memo(FooterLayout);
