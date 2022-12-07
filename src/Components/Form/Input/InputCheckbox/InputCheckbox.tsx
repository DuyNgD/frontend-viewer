import { FC, memo } from "react";
import "./InputCheckbox.css";

const InputCheckbox: FC<any> = (props) => {
  return <input {...props.defaultOption} />;
};

export default memo(InputCheckbox);
