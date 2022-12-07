import { FC, memo } from "react";
import "./InputText.css";

const InputText: FC<any> = (props) => {
  return <input {...props.defaultOption} />;
};

export default memo(InputText);
