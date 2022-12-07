import { FC, memo } from "react";
import "./InputDate.css";

const InputDate: FC<any> = (props) => {
  return <input {...props.defaultOption} />;
};

export default memo(InputDate);
