import { FC, memo } from "react";
import "./Form.css";

const Form: FC<any> = (props) => {
  return (
    <form {...props} autoComplete={"off"}>
      {props.children}
    </form>
  );
};

export default memo(Form);
