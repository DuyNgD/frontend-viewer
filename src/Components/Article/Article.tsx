import { FC, memo } from "react";
import "./Article.css";

const Article: FC<any> = (props) => {
  return <article className={props.className}>{props.children}</article>;
};

export default memo(Article);
