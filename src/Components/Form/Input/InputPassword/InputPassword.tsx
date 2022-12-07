import { FC, memo } from "react";
import "./InputPassword.css";

const InputPassword: FC<any> = (props) => {
  return <input {...props.defaultOption} autoComplete={"new-password"} />;
};

export default memo(InputPassword);
