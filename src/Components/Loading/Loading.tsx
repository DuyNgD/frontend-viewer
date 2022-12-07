import { FC, memo } from "react";
import "./Loading.css";

const Loading: FC<any> = () => {
  return <div className={"loading"} />;
};

export default memo(Loading);
