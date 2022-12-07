import { FC, memo } from "react";
import "./InputEmail.css";

const InputEmail: FC<any> = (props) => {
  return <input {...props.defaultOption} />;
};

export default memo(InputEmail);
