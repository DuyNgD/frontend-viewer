import { FC, memo } from "react";
import "./InputTextarea.css";

const InputTextarea: FC<any> = (props) => {
  return <textarea {...props.defaultOption} />;
};

export default memo(InputTextarea);
